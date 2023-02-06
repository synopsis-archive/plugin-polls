using Microsoft.AspNetCore.SignalR;

namespace CorePlugin.Plugin.Hubs;

public class PollsHub : Hub<IPollsHub>
{
    public async Task ReceiveUpdates(string pollCode)
        => await Groups.AddToGroupAsync(Context.ConnectionId, pollCode);

    public async Task NoFurtherUpdates(string pollCode)
        => await Groups.RemoveFromGroupAsync(Context.ConnectionId, pollCode);
}
