using Core.Plugin.Interface;
using CorePlugin.PollsDb;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PluginPolls.PollsDb.Services;

namespace PluginPolls.PollsDb;

public class Plugin : ICorePlugin
{
    public void ConfigureServices(WebApplicationBuilder builder)
    {
        builder.Services.AddDbContext<PollsContext>(db =>
        {
            //TBD - get connection string from config
            db.UseSqlite("Data Source=Polls.sqlite3");
        });
        builder.Services.AddScoped<PollsService>();
        builder.Services.AddHostedService<DatabaseBackgroundService>();
        builder.Services.AddControllers();
    }

    public void Configure(WebApplication app) => app.MapControllers();
}