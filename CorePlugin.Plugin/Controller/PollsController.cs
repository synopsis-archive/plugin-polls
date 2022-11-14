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

    [HttpPost]
    public async Task<ActionResult<PollDto>> CreatePoll([FromBody] PollReplayDto poll)
    {
        return Ok(await _pollsService.CreatePollAsync(poll, Guid.NewGuid()));
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
    public async Task<ActionResult<PollDto>> GetPollByCode(string pollCode)
    {
        try
        {
            return Ok(await _pollsService.GetPollAsync(pollCode));
        }
        catch (Exception exception)
        {
            exception.Message.LogError();
            return BadRequest(exception.Message);
        }
    }
    
    [HttpGet("GetPollResult/{pollCode}")]
    public async Task<ActionResult<PollResultDto>> GetPollResultByCode(string pollCode)
    {
        try
        {
            return Ok(await _pollsService.GetPollResultAsync(pollCode));
        }
        catch (Exception exception)
        {
            exception.Message.LogError();
            return BadRequest(exception.Message);
        }
    }
    
    [HttpGet("GetPollsFromTeacher/{teacherGuid}")]
    public async Task<ActionResult<List<PollDto>>> GetPollsFromTeacher(Guid teacherGuid)
    {
        try
        {
            $"Get Polls from Teacher {teacherGuid}".LogSuccess();
            return Ok(await _pollsService.GetPollsOfTeacherAsync(teacherGuid));
        }
        catch (Exception exception)
        {
            exception.Message.LogError();
            return BadRequest(exception.Message);
        }
    }
    
    [HttpDelete("DeletePoll/{teacherGuid}/{pollCode}")]
    public async Task<ActionResult<bool>> DeletePoll(string pollCode, Guid teacherGuid)
    {
        try
        {
            $"Delete Poll {pollCode}".LogSuccess();
            if(await _pollsService.DeletePollAsync(pollCode, teacherGuid))
                return Ok();
            return BadRequest("Cannot delete Poll of other Teacher");
        }
        catch (Exception exception)
        {
            exception.Message.LogError();
            return BadRequest(exception.Message);
        }
    }
}
