using PluginPolls.PollsDb;

namespace PluginPolls.Backend.Services;

public class PollsService
{
	private PollsContext _pollsContext;
	
	public PollsService(PollsContext pollsContext) => _pollsContext = pollsContext;
}