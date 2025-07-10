using Backend.Bll.Clients;
using Backend.Bll.Clients.Interfaces;
using Backend.Bll.Configuration;
using Backend.Bll.Services;

namespace Backend.Api;

public static class Program
{
    public static void Main(string[] args)
    {
        WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

        builder.Services.Configure<LlmConfiguration>(builder.Configuration.GetSection("Llm"));

        builder.Services.AddScoped<TravelService>();

        builder.Services.AddScoped<ILlmClient, PerplexityClient>();

        builder.Services.AddControllers();
        // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
        builder.Services.AddOpenApi();

        WebApplication app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi();
        }

        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}
