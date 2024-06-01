namespace server.Dto;

public class ProductDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    public string Desc { get; set; }
    public BrandDto? Brand { get; set; }
    public CategoryDto? Category { get; set; }
}