using System.Text.Json;
using backend.Models;

namespace backend.CarHost;

public class CarService
{
    private readonly List<Car> _cars;

    public CarService(IWebHostEnvironment env)
    {
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
}