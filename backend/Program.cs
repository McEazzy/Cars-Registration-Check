
using backend.CarHost;
using backend.NotifyHub;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Force HTTP only (disable HTTPS endpoint) for testing purposes
builder.WebHost.UseUrls("http://localhost:5000");

// Add CORS policy to allow requests from frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials());
});

// Add SignalR services for notifying car registration expiry update to frontend
builder.Services.AddSignalR();

// Add CarService as a singleton
builder.Services.AddSingleton<CarService>();

// Configure logging to the console (if not already present by default)
builder.Logging.AddConsole();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

// Map the RegoHub route for SignalR
app.MapHub<RegoHub>("/regohub");

app.Run();
