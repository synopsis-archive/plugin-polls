using CorePlugin.PollsDb;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace PluginPolls.PollsDb.Services;

public class DatabaseBackgroundService: BackgroundService
{
    private readonly IServiceProvider _serviceProvider;

    public DatabaseBackgroundService(IServiceProvider serviceProvider) => _serviceProvider = serviceProvider;

    protected override Task ExecuteAsync(CancellationToken stoppingToken)
    {
        return Task.Run(() =>
        {
            using var scope = _serviceProvider.CreateScope();
            var dbContext = scope.ServiceProvider.GetRequiredService<PollsContext>();
            dbContext.Database.EnsureCreated();
            Console.WriteLine("Database OK!");
            Console.WriteLine($"Database includes a total of {dbContext.Polls.Count()} polls");
        }, stoppingToken);
    }
}