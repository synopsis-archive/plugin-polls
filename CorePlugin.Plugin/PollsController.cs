using Microsoft.AspNetCore.Mvc;
using PluginPolls.PollsDb.Services;

namespace PluginPolls.PollsDb;

[ApiController]
[Route("[controller]")]
public class PollsController : ControllerBase
{
    private readonly PollsService _pollsService;

    public PollsController(PollsService pollsService) => _pollsService = pollsService;

    [HttpGet]
    public async Task<ActionResult<string>> Test()
    {
        return Ok(await _pollsService.GetTestValue());
    }  
}