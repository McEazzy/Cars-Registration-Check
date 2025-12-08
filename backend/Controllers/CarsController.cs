using System;
using System.IO;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using backend.CarHost;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CarsController : ControllerBase
{
    private readonly CarService _carService;
    public CarsController(CarService carService)
    {
        _carService = carService;
    }

    //Endpoint to get all the cars
    [HttpGet]
    public IActionResult GetCars()
    {
        return Ok(_carService.GetCars(null));
    }

    //Endpoint to get cars by "make"
    [HttpGet("{make}")]
    public IActionResult GetCars(string make)
    {
        return Ok(_carService.GetCars(make));
    }
}