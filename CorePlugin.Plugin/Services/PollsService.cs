using CorePlugin.PollsDb;
using Microsoft.EntityFrameworkCore;

namespace PluginPolls.PollsDb.Services;

public class PollsService
{
    private readonly PollsContext _pollsContext;

    public PollsService(PollsContext pollsContext) => _pollsContext = pollsContext;

    public async Task<string> GetTestValue()
    {
        var poll = await _pollsContext.Polls.FirstOrDefaultAsync();
        return poll?.PollName ?? "No polls found!";
    }
}
