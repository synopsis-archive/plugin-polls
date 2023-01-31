using CorePlugin.Plugin.Dtos;

namespace CorePlugin.Plugin.Hubs;

public interface IPollsHub
{
    public Task NewVoteReceived(PollResultDto pollResultDto);
}
