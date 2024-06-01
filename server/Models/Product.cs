using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models;


[Table("Product")]
public class Product
{
    [Key]
    public int Id { get; set; }
    [Required]
    [StringLength(500)]
    public required string Name { get; set; }
    [Required]
    public required decimal Price { get; set; }

    [Required]
    [Column("Description")]
    public required string Desc { get; set; }

    public Category Category { get; set; }

    public Brand Brand { get; set; }
}