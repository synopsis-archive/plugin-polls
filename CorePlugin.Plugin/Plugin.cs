using System.Security.Cryptography.Xml;
using Core.Backend;
using Core.Plugin.Interface;
using CorePlugin.Plugin.Hubs;
using CorePlugin.Plugin.Services;
using CorePlugin.PollsDb;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace CorePlugin.Plugin;

public class Plugin : ICorePlugin
{
    public void ConfigureServices(WebApplicationBuilder builder)
    {

        builder.Services.AddDbContext<PollsContext>(db =>
        {
            var connectionString = builder.Configuration.GetConnectionStringThatAlsoWorksInProduction("PollsDatabaseConnection", builder.Environment.IsDevelopment());
            if (builder.Environment.IsDevelopment())
            {
                db.UseSqlite(connectionString);
            }
            else
            {
                db.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
            }
        });

        builder.Services.AddScoped<PollsService>();
        builder.Services.AddHostedService<DatabaseBackgroundService>();
        builder.Services.AddSignalR(x => x.EnableDetailedErrors = true);
        builder.Services.AddControllers();
    }

    public void Configure(WebApplication app)
    {
        app.MapHub<PollsHub>("/hubs/polls");
        app.MapControllers();
    }
}
