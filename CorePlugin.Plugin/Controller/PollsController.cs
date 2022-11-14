using CorePlugin.Plugin.Dtos;
using CorePlugin.Plugin.Services;
using Microsoft.AspNetCore.Mvc;

namespace CorePlugin.Plugin.Controller;

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
    
    [HttpPost("Vote/{pollCode}")]
    public async Task<ActionResult<PollResultDto>> SubmitVote(string pollCode, [FromBody] List<VoteReplayDto> voteReplayDto)
    {
        try
        {
            return Ok(await _pollsService.SubmitVotesAsync(pollCode, voteReplayDto));
        }
        catch (Exception exception)
        {
            exception.Message.LogError();
            return BadRequest(exception.Message);
        }
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

    [HttpGet("GetPoll/{pollCode}")]
    public async Task<ActionResult<PollResultDto>> GetPollByCode(string pollCode)
    {
        try
        {
            $"Get Poll {pollCode}".LogSuccess();
            return Ok(await _pollsService.GetPollAsync(pollCode));
        }
        catch (Exception exception)
        {
            exception.Message.LogError();
            return BadRequest(exception.Message);
        }
    }
}
