using CorePlugin.Plugin.Dtos;
using CorePlugin.Plugin.Exceptions;
using CorePlugin.PollsDb;
using Microsoft.EntityFrameworkCore;

namespace CorePlugin.Plugin.Services;

public class PollsService : IPollsService
{
    private readonly PollsContext _pollsContext;

    public PollsService(PollsContext pollsContext) => _pollsContext = pollsContext;

    public async Task<string> GetTestValue()
    {
        var poll = await _pollsContext.Polls.FirstOrDefaultAsync();
        return poll?.PollName ?? "No polls found!";
    }

    public Task<PollDto> GetPollsOfTeacherAsync(Guid teacherGuid)
    {
        throw new NotImplementedException();
    }

    public Task<PollResultDto> CreatePollAsync(PollReplayDto pollDto, Guid teacherGuid)
    {
        throw new NotImplementedException();
    }

    public Task<PollDto> GetPollAsync(string code)
    {
        throw new NotImplementedException();
    }

    public Task<PollResultDto> GetPollResultAsync(string code)
    {
        throw new NotImplementedException();
    }

    public Task<PollResultDto> SubmitVotesAsync(string code, List<VoteReplayDto> voteReplayDtos)
    {
        throw new NotImplementedException();
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
        if (poll == null)
            throw new InvalidPollIdException($"Poll with id {pollCode} not found!");

        if (poll.EndTime < DateTime.Now)
            return new PollResultDto().CopyPropertiesFrom(poll);

        poll.EndTime = DateTime.Now;
        await _pollsContext.SaveChangesAsync();
        return new PollResultDto().CopyPropertiesFrom(poll);
    }

    public Task<bool> DeletePollAsync(string code, Guid teacherGuid)
    {
        throw new NotImplementedException();
    }
}
