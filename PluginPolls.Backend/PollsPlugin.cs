using System.Globalization;
using Core.Plugin.Interface;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using PluginPolls.Backend.Services;

namespace PluginPolls.Backend;

public class PollsPlugin : ICorePlugin
{
    string corsKey = "_myCorsKey";

    public void ConfigureServices(WebApplicationBuilder builder)
    {
        // TODO: add DbContext?
        builder.Services.AddScoped<PollsService>();
        builder.Services.AddControllers();
    }

    public void Configure(WebApplication app)
    {
        app.MapControllers();
    }
}