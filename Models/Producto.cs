using System.ComponentModel.DataAnnotations;
namespace WebApiNetCore.Models
{
    public class Producto
    {
        public int Id { get; set; }
        [Required]
        public string Nombre { get; set; } = string.Empty;
        public string? Description { get; set; }

        [Range(0.01, double.MaxValue)]
        public decimal Precio { get; set; }
        public DateTime FechaCreacion { get; set; } = DateTime.UtcNow;
    }
}