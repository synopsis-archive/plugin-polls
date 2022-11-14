using CorePlugin.Plugin.Dtos;
using CorePlugin.Plugin.Exceptions;
using CorePlugin.PollsDb;
using Microsoft.EntityFrameworkCore;

namespace CorePlugin.Plugin.Services;

public class PollsService : IPollsService
{
    private readonly PollsContext _pollsContext;

    public PollsService(PollsContext pollsContext) => _pollsContext = pollsContext;

    public Task<List<PollDto>> GetPollsOfTeacherAsync(Guid teacherGuid)
    {
        return _pollsContext.Polls
            .Where(poll => poll.CreatedBy == teacherGuid)
            .Select(poll => new PollDto
            {
                PollCode = poll.PollCode,
                PollName = poll.PollName,
                PollQuestion = poll.PollQuestion,
                CreatedBy = poll.CreatedBy,
                StartTime = poll.StartTime,
                EndTime = poll.EndTime,
                IsMultipleChoice = poll.IsMultipleChoice,
                PollOptions = poll.PollOptions.Select(po => new PollOptionDto().CopyPropertiesFrom(po)).ToList()
            }).ToListAsync();
    }

    public async Task<PollDto> CreatePollAsync(PollReplayDto poll, Guid teacherGuid)
    {
        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".ToCharArray();
        Random rnd = new Random();
        Poll newPoll = new Poll
        {
            PollCode = new string("000000".ToCharArray().Select(x => chars[rnd.NextInt64(chars.Length)]).ToArray()),
            CreatedBy = teacherGuid,
            IsMultipleChoice = poll.IsMultipleChoice,
            StartTime = poll.StartTime,
            EndTime = poll.EndTime,
            PollQuestion = poll.PollQuestion,
            PollName = poll.PollName,
            PollOptions = poll.PollOptions.Select(option => new PollOption
            {
                Description = option.Description
            }).ToList(),
        };
        await _pollsContext.Polls.AddAsync(newPoll);
        await _pollsContext.SaveChangesAsync();
        return new PollDto
        {
            PollName = newPoll.PollName,
            CreatedBy = newPoll.CreatedBy,
            EndTime = newPoll.EndTime,
            PollOptions = newPoll.PollOptions.Select(pollOption => new PollOptionDto { Description = pollOption.Description }).ToList(),
            PollCode = newPoll.PollCode,
            IsMultipleChoice = newPoll.IsMultipleChoice,
            PollQuestion = newPoll.PollQuestion,
            StartTime = newPoll.StartTime,
        };
    }

    public async Task<PollDto> GetPollAsync(string code)
    {
        var poll = await _pollsContext.Polls.Include(x => x.PollOptions).FirstOrDefaultAsync(p => p.PollCode == code);
        CheckPoll(code, poll);
        return new PollResultDto
        {
            PollCode = poll.PollCode,
            PollName = poll.PollName,
            PollQuestion = poll.PollQuestion,
            CreatedBy = poll.CreatedBy,
            StartTime = poll.StartTime,
            EndTime = poll.EndTime,
            IsMultipleChoice = poll.IsMultipleChoice,
            PollOptions = poll.PollOptions.Select(po => new PollOptionDto().CopyPropertiesFrom(po)).ToList()
        };
    }

    public async Task<PollResultDto> GetPollResultAsync(string code)
    {
        var poll = _pollsContext.Polls.Include(poll => poll.PollOptions).Include(poll => poll.SubmittedVotes).Single(poll => poll.PollCode == code);
        var options = new Dictionary<long, PollOptionDto>();
        foreach (var pollOption in poll.PollOptions)
        {
            options[pollOption.PollOptionId] = new PollOptionDto
            {
                PollOptionId = pollOption.PollOptionId,
                Description = pollOption.Description,
            };
        }
        var result = new Dictionary<PollOptionDto, ReceivedVotesDto>();
        foreach (var pollVote in poll.SubmittedVotes)
        {
            var pollOption = options[pollVote.SelectedPollOptionId];
            if (!result.ContainsKey(pollOption))
            {
                result[pollOption] = new ReceivedVotesDto { ReceivedVotes = 0 };
            }
            result[pollOption].ReceivedVotes++;
        }
        var totalVotes = poll.SubmittedVotes.Count();
        foreach (var entry in result)
        {
            entry.Value.Percentage = ((byte)((double)entry.Value.ReceivedVotes / totalVotes));
        }
        var pollDto = await GetPollResultAsync(code);
        PollResultDto pollResultDto = new PollResultDto().CopyPropertiesFrom(pollDto);
        pollResultDto.Results = result;
        pollResultDto.ReceivedAnswers = totalVotes;
        return pollResultDto;
    }

    /// <summary>
    /// Method <c>SubmitVotes</c> submits all given votes to the database.
    /// </summary>
    /// <param name="pollCode">The code of the poll to which a vote should be added</param>
    /// <param name="voteReplayDtos">Information regarding the vote</param>
    /// <returns>True if the operation succeeds</returns>
    /// <exception cref="InvalidPollIdException">Is thrown if the poll with id <para>pollId</para> is not present in the database</exception>
    /// <exception cref="PollClosedException">Is thrown if the poll is already closed.</exception>
    /// <exception cref="NotMultipleChoiceException">Is thrown if more than one voteReplay is sent and the poll is not multiple choice.</exception>
    /// <exception cref="NoVoteSubmittedException">Is thrown if <para>voteReplayDtos</para> is empty.</exception>
    /// <exception cref="InconsistentUserException">Is thrown if <para>voteReplayDtos</para> contains more than one userId.</exception>
    /// <exception cref="AlreadyVotedException">Is thrown if the user already voted for this poll.</exception>
    public async Task<PollResultDto> SubmitVotesAsync(string pollCode, List<VoteReplayDto> voteReplayDtos)
    {
        var poll = await _pollsContext.Polls
            .Include(x => x.SubmittedVotes)
            .Include(x => x.PollOptions)
            .SingleOrDefaultAsync(p => p.PollCode == pollCode);

        CheckPoll(pollCode, poll);
        CheckVoteDtos(voteReplayDtos, poll);

        Poll pollToReturn = null!;
        foreach (var voteReplayDto in voteReplayDtos)
            pollToReturn = await AddVoteToPoll(poll!, voteReplayDto);

        return pollToReturn.ToPollResultDto();
    }

    /// <summary>
    /// Method <c>ClosePollAsync</c> closes the poll.
    /// </summary>
    /// <param name="pollCode">The code of poll which should be closed</param>
    /// <param name="teacherGuid">The guid of the current logged in teacher</param>
    /// <returns>True if the operation succeeds</returns>
    /// <exception cref="InvalidPollIdException">Is thrown if the poll with id <para>pollId</para> is not present in the database</exception>
    public async Task<PollResultDto> ClosePollAsync(string pollCode, Guid teacherGuid)
    {
        var poll = await _pollsContext.Polls.SingleOrDefaultAsync(p => p.PollCode == pollCode);

        CheckPoll(pollCode, poll);

        poll!.EndTime = DateTime.Now;
        await _pollsContext.SaveChangesAsync();
        return new PollResultDto().CopyPropertiesFrom(poll);
    }

    public async Task<bool> DeletePollAsync(string code, Guid teacherGuid)
    {
        var poll = await _pollsContext.Polls.SingleOrDefaultAsync(p => p.PollCode == code);
        CheckPoll(code, poll);

        if (poll!.CreatedBy != teacherGuid)
            return false;

        _pollsContext.Polls.Remove(poll!);
        await _pollsContext.SaveChangesAsync();
        return true;
    }

    #region Private Helper Methods
    private static void CheckPoll(string pollCode, Poll? poll)
    {
        if (poll == null)
            throw new InvalidPollIdException($"Poll with id {pollCode} not found!");

        if (poll.EndTime < DateTime.Now)
            throw new PollClosedException($"Poll with id {pollCode} is already closed!");
    }

    private static void CheckVoteDtos(IReadOnlyList<VoteReplayDto> voteReplayDtos, Poll? poll)
    {
        if (voteReplayDtos.Count == 0)
            throw new NoVoteSubmittedException("No votes given!");

        if (voteReplayDtos.Count != 1 && !poll!.IsMultipleChoice)
            throw new NotMultipleChoiceException($"Poll with {poll.PollId} is not a multiple choice poll!");

        if (voteReplayDtos.Any(x => x.SubmittedBy != voteReplayDtos[0].SubmittedBy))
            throw new InconsistentUserException("All votes must be submitted by the same user!");

        if (poll!.SubmittedVotes.Any(x => x.UserId == voteReplayDtos[0].SubmittedBy))
            throw new AlreadyVotedException($"User with id {voteReplayDtos[0].SubmittedBy} has already submitted a vote!");
    }

    private async Task<Poll> AddVoteToPoll(Poll poll, VoteReplayDto voteReplayDto)
    {
        var optionExistsOnPoll = poll.PollOptions.Any(o => o.PollOptionId == voteReplayDto.OptionId);
        if (!optionExistsOnPoll)
            throw new InvalidOptionForPollException($"Unknown option with id {voteReplayDto.OptionId} for poll {poll.PollId}!");

        await _pollsContext.PollVotes.AddAsync(new SubmittedVote
        {
            UserId = voteReplayDto.SubmittedBy,
            SelectedPollOptionId = voteReplayDto.OptionId,
        });
        await _pollsContext.SaveChangesAsync();

        $"Added vote for Option with Id {voteReplayDto.OptionId} to poll {poll.PollId}".LogSuccess();
        return poll;
    }
    #endregion
}
