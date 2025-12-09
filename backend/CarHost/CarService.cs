using System;
using System.Text.Json;
using System.Text.RegularExpressions;
using System.Threading.Tasks.Dataflow;
using backend.Models;
using backend.NotifyHub;
using Microsoft.AspNetCore.SignalR;

namespace backend.CarHost;

public class CarService
{
    private readonly List<Car> _cars;
    private readonly IWebHostEnvironment _env;

    private readonly ILogger<CarService> _logger;
    public CarService(IWebHostEnvironment env, ILogger<CarService> logger)
    {
        // Save the environment to access content root path later
        _env = env;

        _logger = logger;

        // Form the native path to the json data file
        var path = Path.Combine(env.ContentRootPath, "Dataset", "cars.json");

        // Read the json data from file and deserialize into list of Car objects 
        var jsonCarsString = File.ReadAllText(path);
        _cars = JsonSerializer.Deserialize<List<Car>>(jsonCarsString) ?? new List<Car>();
    }

    // Method to get all cars or filter by "make"
    public List<Car> GetCars(string? make)
    {
        if (string.IsNullOrEmpty(make))
        {
            return _cars;
        }
        else
        {
            return _cars.Where(car => car.make.Equals(make, StringComparison.OrdinalIgnoreCase)).ToList();
        }
    }

    // Check for cars registration in the database
    public async Task CheckCarRego(int id, IHubContext<RegoHub> hubContext)
    {
        Car targetCar = null;
        DateTime now = DateTime.Now;
        var match = false;

        foreach (Car c in _cars){
            if (id == c.id)
            {
                // Found matching car in the existing database
                targetCar = c;
                match = true;
                break;
            }
        }

        // No matching car found in current database, create a new car entry with mock metadata and a randomized rego expiry date
        if (!match)
        {
            targetCar = new Car
            {
                id = id,
                make = "Ford",
                model = "Model T",
                owner = "Henry Ford",
                // 50% chance of expired rego within a year before or after now
                regoExpiry = (new Random().Next(0, 2) == 0) ? now.AddDays(-1 * new Random().Next(1, 365)).ToString("yyyy-MM-dd") : now.AddDays(new Random().Next(1, 365)).ToString("yyyy-MM-dd")
            };

            // Add the new searched mock car to the current database
            _cars.Add(targetCar);
            UpdateJsonDataFile(_env);
        }

        if (targetCar != null) await hubContext.Clients.All.SendAsync("CarRegoChecked", targetCar);
    }

    // Method to update the json data file with the current list of cars
    public void UpdateJsonDataFile(IWebHostEnvironment env)
    {
        var path = Path.Combine(env.ContentRootPath, "Dataset", "cars.json");
        var jsonCarsString = JsonSerializer.Serialize(_cars, new JsonSerializerOptions { WriteIndented = true });
        File.WriteAllText(path, jsonCarsString);
    }
}