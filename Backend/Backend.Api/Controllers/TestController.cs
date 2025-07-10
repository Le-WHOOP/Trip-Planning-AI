using Backend.Bll;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class TestController : ControllerBase
{
    private readonly Class1 _class1;

    public TestController(Class1 class1)
    {
        _class1 = class1;
    }

    [HttpGet("")]
    public async Task<ActionResult<string>> Test()
    {
        return Ok(await _class1.Test());
    }
}
