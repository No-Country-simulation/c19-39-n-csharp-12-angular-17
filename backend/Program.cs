

using AgendApp.Models;
using AgendApp.Services;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

var builder = WebApplication.CreateBuilder(args);
var Cors = "MyCors";

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Settings per environment
var env = builder.Environment;

builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true, reloadOnChange: true)
    .AddEnvironmentVariables();


builder.Services.AddDbContext<AgendappDbContext>(option =>
{
    option.UseSqlServer(builder.Configuration.GetConnectionString("Connection"));
});


//DB Connection
builder.Services.AddDbContext<AgendappDbContext>(option =>
{
    option.UseSqlServer(builder.Configuration.GetConnectionString("Connection"));
});

//services references
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IRegisterService, RegisterService>();
builder.Services.AddScoped<IMedService, MedService>();
builder.Services.AddScoped<IAppService, AppService>();

//Añadir Cors
builder.Services.AddCors(
    options => options.AddPolicy(name: Cors, buid =>
    buid.AllowAnyOrigin()
    //WithOrigins("http://localhost:4200")
    .AllowAnyHeader()
    .AllowAnyMethod()));


var app = builder.Build();

//Show swagger UI
if(app.Environment.IsDevelopment() || app.Environment.IsProduction())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors(Cors);
}

// Actual environment Middleware
app.MapGet("/environment", (IHostEnvironment env) =>
{
    return Results.Ok(new { Environment = env.EnvironmentName });
});


app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
