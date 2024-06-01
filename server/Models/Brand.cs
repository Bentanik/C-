using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models;


[Table("Brand")]
public class Brand
{
    [Key]
    public int Id { get; set; }
    [Required]
    [StringLength(500)]
    public required string Name { get; set; }

    public ICollection<Product> Products { get; set; }
}