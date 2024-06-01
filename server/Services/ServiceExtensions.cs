using server.Interfaces;
using server.Repositories;

namespace server.Helpers;
public static class ServiceExtensions
{
    public static void AddScopedServices(this IServiceCollection services)
    {
        services.AddScoped<ICategoryRepository, CategoryRepository>();
        services.AddScoped<IBrandRepository, BrandRepository>();
        services.AddScoped<IProductRepository, ProductRepository>();
    }
}

