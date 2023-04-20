using Microsoft.Extensions.Configuration;

namespace Core.Backend;

public static partial class ConfigurationExtensions
{
    public static string? GetConnectionStringThatAlsoWorksInProduction(this IConfiguration configuration, string name, bool isDevelopment = false)
    {
        return configuration.GetConnectionString(isDevelopment ? name : "core")?.Replace("core", name.ToLower()) ?? null;
    }
}
