using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Interfaces;
using server.Models;

namespace server.Repositories;

public class BrandRepository : IBrandRepository
{
    private readonly DataContext _context;

    public BrandRepository(DataContext context)
    {
        _context = context;
    }

    public async Task<bool> CreateBrand(Brand brand)
    {
        await _context.AddAsync(brand);
        return await SaveChanges();
    }

    public async Task<bool> UpdateBrand(Brand brand)
    {
        _context.Brands.Update(brand);
        return await SaveChanges();
    }

    public async Task<bool> RemoveBrandById(int id)
    {
        var brand = await _context.Brands.Where(c => c.Id == id).FirstOrDefaultAsync();
        _context.Brands.Remove(brand);
        return await SaveChanges();
    }

    public async Task<List<Brand>> GetBrands()
    {
        return await _context.Brands.ToListAsync();
    }

    public async Task<Brand> GetBrand(int id)
    {
        return await _context.Brands.Where(c => c.Id == id).FirstOrDefaultAsync();
    }

    public async Task<bool> SaveChanges()
    {
        var saved = await _context.SaveChangesAsync();
        return saved > 0 ? true : false;
    }

    public async Task<bool> BrandExists(int id)
    {
        return await _context.Brands.AnyAsync(c => c.Id == id);
    }
}