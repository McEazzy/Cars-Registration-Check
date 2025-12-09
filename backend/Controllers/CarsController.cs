using System;
using System.IO;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using backend.CarHost;
using Microsoft.AspNetCore.SignalR;
using backend.NotifyHub;

namespace backend.Controllers;

[ApiController]
[Route("api/cars")]
public class CarsController : ControllerBase
{
    private readonly CarService _carService;
    private readonly IHubContext<RegoHub> _hubContext;

    private readonly ILogger<CarsController> _logger;

    public CarsController(CarService carService, IHubContext<RegoHub> hubContext, ILogger<CarsController> logger)
    {
        _carService = carService;
        _hubContext = hubContext;
        _logger = logger;
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

    [HttpGet("rego/{id}")]
    public async Task<IActionResult> SetRegoTarget(int id)
    {
        
        await _carService.CheckCarRego(id, _hubContext);
        return Ok();
    }
}