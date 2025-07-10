using Backend.Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class TravelController : ControllerBase
{

    private readonly ILogger<TravelController> _logger;

    public TravelController(ILogger<TravelController> logger)
    {
        _logger = logger;
    }

    [HttpPost("")]
    public ActionResult<Response> ComputeTravelPlan([FromBody] Request request)
    {
        throw new NotImplementedException("Rip");
    }
}
