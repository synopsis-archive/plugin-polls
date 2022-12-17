using Core.Plugin.Interface;
using CorePlugin.Plugin.Services;
using CorePlugin.PollsDb;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CorePlugin.Plugin;

public class Plugin : ICorePlugin
{
    public void ConfigureServices(WebApplicationBuilder builder)
    {
        builder.Services.AddDbContext<PollsContext>(db =>
        {
            var connectionString = builder.Configuration.GetConnectionString("PollsDatabaseConnection");
            db.UseSqlite(connectionString);
        });
        builder.Services.AddScoped<PollsService>();
        builder.Services.AddHostedService<DatabaseBackgroundService>();
        builder.Services.AddControllers();
    }

    public void Configure(WebApplication app) => app.MapControllers();
}
