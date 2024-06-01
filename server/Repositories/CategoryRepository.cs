using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Interfaces;
using server.Models;

namespace server.Repositories;

public class CategoryRepository : ICategoryRepository
{
    private readonly DataContext _context;

    public CategoryRepository(DataContext context)
    {
        _context = context;
    }

    public async Task<bool> CreateCategory(Category category)
    {
        await _context.AddAsync(category);
        return await SaveChanges();
    }

    public async Task<bool> UpdateCategory(Category category)
    {
        _context.Categories.Update(category);
        return await SaveChanges();
    }

    public async Task<bool> RemoveCategoryById(int id)
    {
        var category = await _context.Categories.Where(c => c.Id == id).FirstOrDefaultAsync();
        _context.Categories.Remove(category);
        return await SaveChanges();
    }

    public async Task<List<Category>> GetCategories()
    {
        return await _context.Categories.ToListAsync();
    }

    public async Task<Category> GetCategory(int id)
    {
        return await _context.Categories.Where(c => c.Id == id).FirstOrDefaultAsync();
    }

    public async Task<bool> SaveChanges()
    {
        var saved = await _context.SaveChangesAsync();
        return saved > 0 ? true : false;
    }

    public async Task<bool> CategoryExists(int id)
    {
        return await _context.Categories.AnyAsync(c => c.Id == id);
    }
}