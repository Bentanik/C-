using server.Models;

namespace server.Interfaces;

public interface IProductRepository
{
    Task<List<Product>> GetProducts();
    Task<Product> GetProductById(int id);
    Task<bool> CreateProduct(int categoryId, int brandId, Product product);

    Task<bool> UpdateProduct(int categoryId, int brandId, Product product);

    Task<bool> RemoveProductById(int id);

    Task<bool> SaveChanges();
}