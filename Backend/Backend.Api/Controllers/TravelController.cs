using Backend.Bll.Models;
using Backend.Bll.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class TravelController : ControllerBase
{
    private readonly TravelService _travelService;

    public TravelController(TravelService travelService)
    {
        _travelService = travelService;
    }

    [HttpPost("")]
    public async Task<ActionResult<Response>> ComputeTravelPlan([FromBody] Request request)
    {
        return Ok(await _travelService.DoYourThing(request));
    }
}
