using CorePlugin.PollsDb;
using Microsoft.EntityFrameworkCore;
using PluginPolls.PollsDb.Dtos;

namespace PluginPolls.PollsDb.Services;

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

    public Task<PollResultDto> ClosePollAsync(string code, Guid teacherGuid)
    {
        throw new NotImplementedException();
    }

    public Task<bool> DeletePollAsync(string code, Guid teacherGuid)
    {
        throw new NotImplementedException();
    }
}
