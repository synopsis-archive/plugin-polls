using CorePlugin.Plugin.Dtos;
using CorePlugin.Plugin.Services;
using Microsoft.AspNetCore.Mvc;

namespace CorePlugin.Plugin;

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
    
    [HttpPut("Close/{pollCode}")]
    public async Task<ActionResult<PollResultDto>> ClosePoll(string pollCode, [FromBody] Guid teacherGuid)
    {
        try
        {
            $"Closed Poll {pollCode}".LogSuccess();
            return Ok(await _pollsService.ClosePollAsync(pollCode, teacherGuid));
        }
        catch (Exception exception)
        {
            exception.Message.LogError();
            return BadRequest(exception.Message);
        }
    }
}
