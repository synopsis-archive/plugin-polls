using CorePlugin.Plugin.Dtos;
using CorePlugin.Plugin.Exceptions;
using CorePlugin.PollsDb;
using Microsoft.EntityFrameworkCore;

namespace CorePlugin.Plugin.Services;

public class PollsService : IPollsService
{
    private readonly PollsContext _pollsContext;

    public PollsService(PollsContext pollsContext) => _pollsContext = pollsContext;

    public async Task<PollResultDto> CreatePollAsync(PollReplayDto poll, Guid teacherGuid, string creatorName)
    {
        var newPoll = new Poll
        {
            PollCode = GeneratePollCode(),
            CreatorName = creatorName,
            CreatedBy = teacherGuid,
            IsMultipleChoice = poll.IsMultipleChoice,
            StartTime = poll.StartTime,
            EndTime = poll.EndTime,
            PollQuestion = poll.PollQuestion,
            PollName = poll.PollName,
            PollOptions = poll.PollOptions.Select(option => new PollOption { Description = option.Description }).ToList(),
        };

        await _pollsContext.Polls.AddAsync(newPoll);
        await _pollsContext.SaveChangesAsync();

        return newPoll.ToPollResultDto();
    }

    public async Task<PollDto> GetPollAsync(string code)
    {
        var poll = await _pollsContext.Polls
            .Include(x => x.SubmittedVotes)
            .Include(x => x.PollOptions)
            .FirstOrDefaultAsync(p => p.PollCode == code);

        CheckPoll(code, poll);
        return poll!.ToPollDto();
    }

    public async Task<PollResultDto> GetPollResultAsync(string code)
    {
        var poll = await _pollsContext.Polls
            .Include(poll => poll.PollOptions)
            .Include(poll => poll.SubmittedVotes)
            .SingleOrDefaultAsync(poll => poll.PollCode == code);

        CheckPoll(code, poll);
        return poll!.ToPollResultDto();
    }

    public Task<List<PollResultDto>> GetPollsOfTeacherAsync(Guid teacherGuid)
    {
        return _pollsContext.Polls
            .Include(x => x.PollOptions)
            .Where(poll => poll.CreatedBy == teacherGuid)
            .Select(poll => poll.ToPollResultDto())
            .ToListAsync();
    }

    /// <summary>
    /// Method <c>SubmitVotes</c> submits all given votes to the database.
    /// </summary>
    /// <param name="pollCode">The code of the poll to which a vote should be added</param>
    /// <param name="votedBy">The uuid of the user who submitted the vote(s)</param>
    /// <param name="voteReplayDtos">Information regarding the vote</param>
    /// <returns>True if the operation succeeds</returns>
    /// <exception cref="InvalidPollIdException">Is thrown if the poll with id <para>pollId</para> is not present in the database</exception>
    /// <exception cref="PollClosedException">Is thrown if the poll is already closed.</exception>
    /// <exception cref="NotMultipleChoiceException">Is thrown if more than one voteReplay is sent and the poll is not multiple choice.</exception>
    /// <exception cref="NoVoteSubmittedException">Is thrown if <para>voteReplayDtos</para> is empty.</exception>
    /// <exception cref="AlreadyVotedException">Is thrown if the user already voted for this poll.</exception>
    public async Task<PollResultDto> SubmitVotesAsync(string pollCode, Guid votedBy, List<VoteReplayDto> voteReplayDtos)
    {
        var poll = await _pollsContext.Polls
            .Include(x => x.SubmittedVotes)
            .Include(x => x.PollOptions)
            .SingleOrDefaultAsync(p => p.PollCode == pollCode);

        CheckPoll(pollCode, poll);
        CheckVoteDtos(voteReplayDtos, votedBy, poll);

        Poll pollToReturn = null!;
        foreach (var voteReplayDto in voteReplayDtos)
            pollToReturn = await AddVoteToPoll(poll!, votedBy, voteReplayDto);

        return pollToReturn.ToPollResultDto();
    }

    /// <summary>
    /// Method <c>ClosePollAsync</c> closes the poll.
    /// </summary>
    /// <param name="pollCode">The code of poll which should be closed</param>
    /// <param name="teacherGuid">The guid of the current logged in teacher</param>
    /// <returns>The end result of the poll</returns>
    /// <exception cref="InvalidPollIdException">Is thrown if the poll with id <para>pollId</para> is not present in the database</exception>
    public async Task<PollResultDto> ClosePollAsync(string pollCode, Guid teacherGuid)
    {
        var poll = await _pollsContext.Polls
            .Include(x => x.PollOptions)
            .Include(x => x.SubmittedVotes)
            .SingleOrDefaultAsync(p => p.PollCode == pollCode);

        CheckPoll(pollCode, poll);

        if (teacherGuid != poll!.CreatedBy)
            throw new NotAuthorizedException("You are not authorized to close this poll.");

        poll.EndTime = DateTime.Now;
        await _pollsContext.SaveChangesAsync();
        return poll.ToPollResultDto();
    }

    public async Task<bool> DeletePollAsync(string code, Guid teacherGuid)
    {
        var poll = await _pollsContext.Polls.SingleOrDefaultAsync(p => p.PollCode == code);
        CheckPoll(code, poll);

        if (poll!.CreatedBy != teacherGuid)
            throw new NotAuthorizedException("You are not authorized to delete this poll.");

        _pollsContext.Polls.Remove(poll);
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

    private static void CheckVoteDtos(IReadOnlyList<VoteReplayDto> voteReplayDtos, Guid submittedBy, Poll? poll)
    {
        if (voteReplayDtos.Count == 0)
            throw new NoVoteSubmittedException("No votes given!");

        if (voteReplayDtos.Count != 1 && !poll!.IsMultipleChoice)
            throw new NotMultipleChoiceException($"Poll with {poll.PollId} is not a multiple choice poll!");

        if (poll!.SubmittedVotes.Any(x => x.UserId == submittedBy))
            throw new AlreadyVotedException($"User with Guid {submittedBy} has already submitted a vote!");
    }

    private async Task<Poll> AddVoteToPoll(Poll poll, Guid submittedBy, VoteReplayDto voteReplayDto)
    {
        var optionExistsOnPoll = poll.PollOptions.Any(o => o.PollOptionId == voteReplayDto.OptionId);
        if (!optionExistsOnPoll)
            throw new InvalidOptionForPollException($"Unknown option with id {voteReplayDto.OptionId} for poll {poll.PollId}!");

        _ = await _pollsContext.PollVotes.AddAsync(new SubmittedVote
        {
            UserId = submittedBy,
            PollId = poll.PollId,
            SelectedPollOptionId = voteReplayDto.OptionId,
        });
        await _pollsContext.SaveChangesAsync();

        return poll;
    }

    private string GeneratePollCode()
    {
        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".ToCharArray();
        var rnd = new Random();
        string code;
        do
        {
            code = new string("000000".ToCharArray().Select(_ => chars[rnd.NextInt64(chars.Length)]).ToArray());
        } while (_pollsContext.Polls.Any(poll => poll.PollCode == code));
        return code;
    }
    #endregion
}
