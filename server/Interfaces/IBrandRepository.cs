using server.Models;

namespace server.Interfaces;

public interface IBrandRepository
{
    Task<List<Brand>> GetBrands();
    Task<Brand> GetBrand(int id);

    Task<bool> CreateBrand(Brand Brand);

    Task<bool> UpdateBrand(Brand Brand);

    Task<bool> RemoveBrandById(int id);

    Task<bool> BrandExists(int id);

    Task<bool> SaveChanges();

}