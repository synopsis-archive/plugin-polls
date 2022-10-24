using Core.Plugin.Interface;
using Microsoft.AspNetCore.Builder;

namespace PluginPolls.Backend;

public class PollsPlugin : ICorePlugin
{
    public void ConfigureServices(WebApplicationBuilder builder)
    {
        throw new NotImplementedException();
    }

    public void Configure(WebApplication app)
    {
        throw new NotImplementedException();
    }
}