using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Data;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options) : base(options)
    { }

    #region DbSet
    public DbSet<Product> Products { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Brand> Brands { get; set; }
    #endregion

    #region OnModelCreating
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {}
    #endregion
}