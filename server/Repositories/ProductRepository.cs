using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Interfaces;
using server.Models;

namespace server.Repositories;

public class ProductRepository : IProductRepository
{
    private readonly DataContext _context;

    public ProductRepository(DataContext context)
    {
        _context = context;
    }

    public async Task<List<Product>> GetProducts()
    {
        return await _context.Products.Include(p => p.Category).Include(p => p.Brand).ToListAsync();
    }

    public async Task<Product> GetProductById(int id)
    {
        return await _context.Products.Include(p => p.Category).Include(p => p.Brand).FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task<bool> CreateProduct(int categoryId, int brandId, Product product)
    {
        var category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == categoryId);
        var brand = await _context.Brands.FirstOrDefaultAsync(b => b.Id == brandId);
        if (category == null || brand == null) return false;

        product.Brand = brand;
        product.Category = category;
        await _context.AddAsync(product);
        return await SaveChanges();
    }

    public async Task<bool> UpdateProduct(int categoryId, int brandId, Product product)
    {
        var category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == categoryId);
        var brand = await _context.Brands.FirstOrDefaultAsync(b => b.Id == brandId);
        if (category == null || brand == null) return false;
        
        product.Brand = brand;
        product.Category = category;
        _context.Update(product);
        return await SaveChanges();
    }

    public async Task<bool> RemoveProductById(int id)
    {
        var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);
        _context.Products.Remove(product);
        return await SaveChanges();
    }

    public async Task<bool> SaveChanges()
    {
        var saved = await _context.SaveChangesAsync();
        return saved > 0 ? true : false;
    }
}