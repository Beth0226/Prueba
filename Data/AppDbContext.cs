using Microsoft.EntityFrameworkCore;
using WebApiNetCore.Models;

namespace WebApiNetCore.Data
{
	public class AppDbContext: DbContext 
	{
		public AppDbContext( DbContextOptions<AppDbContext> options): base (options) {}
		public DbSet <Producto>Productos => Set<Producto>();

	}
}