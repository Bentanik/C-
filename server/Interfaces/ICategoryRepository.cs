using server.Models;

namespace server.Interfaces;

public interface ICategoryRepository
{
    Task<List<Category>> GetCategories();
    Task<Category> GetCategory(int id);
    Task<bool> CreateCategory(Category category);
    Task<bool> UpdateCategory(Category category);
    Task<bool> RemoveCategoryById(int id);
    Task<bool> CategoryExists(int id);
    Task<bool> SaveChanges();
}