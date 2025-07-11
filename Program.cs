using Microsoft.EntityFrameworkCore;
using WebApiNetCore.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

var dbPath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "ProductosDB.db");
builder.Services.AddDbContext<AppDbContext>(opt =>
    opt.UseSqlite($"Data Source={dbPath}"));
// o UseSqlite si prefieres

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers(); // Habilita ProductsController
app.UseStaticFiles(); // Para servir el frontend si usas wwwroot

app.Run();