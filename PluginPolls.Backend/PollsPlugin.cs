using Core.Plugin.Interface;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using PluginPolls.Backend.Services;
using PluginPolls.PollsDb;

namespace PluginPolls.Backend;

public class PollsPlugin : ICorePlugin
{
    public void ConfigureServices(WebApplicationBuilder builder)
    {
        builder.Services.AddDbContext<PollsContext>();
        builder.Services.AddScoped<PollsService>();
        builder.Services.AddControllers();
    }

    public void Configure(WebApplication app)
    {
        app.MapControllers();
    }
}