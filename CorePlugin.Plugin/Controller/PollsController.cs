using CorePlugin.Plugin.Dtos;
using CorePlugin.Plugin.Exceptions;
using CorePlugin.Plugin.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace CorePlugin.Plugin.Controller;

[ApiController]
[Route("[controller]")]
public class PollsController : ControllerBase
{
    private readonly PollsService _pollsService;
    private readonly ILogger<PollsController> _logger;

    public PollsController(PollsService pollsService, ILogger<PollsController> logger)
    {
        _pollsService = pollsService;
        _logger = logger;
    }

    [HttpPost]
    public async Task<ActionResult<PollDto>> CreatePoll([FromBody] PollReplayDto poll)
    {
        _logger.LogInformation("Creating poll with args {@Poll}", poll);
        return Ok(await _pollsService.CreatePollAsync(poll, Guid.NewGuid()));
    }

    [HttpPost("Vote/{pollCode}")]
    public async Task<ActionResult<PollResultDto>> SubmitVote(string pollCode, [FromBody] List<VoteReplayDto> voteReplayDto)
    {
        try
        {
            _logger.LogInformation("Submitting vote with args {@Vote}", voteReplayDto);
            return Ok(await _pollsService.SubmitVotesAsync(pollCode, voteReplayDto));
        }
        catch (PollException exception)
        {
            _logger.LogWarning(exception, "Bad request: {@Exception}", exception.Message);
            return BadRequest(exception.Message);
        }
    }

    [HttpPut("Close/{pollCode}:{teacherGuid:guid}")]
    public async Task<ActionResult<PollResultDto>> ClosePoll(string pollCode, [FromBody] Guid teacherGuid)
    {
        try
        {
            _logger.LogInformation("Closing poll with args {@PollCode}", pollCode);
            return Ok(await _pollsService.ClosePollAsync(pollCode, teacherGuid));
        }
        catch (PollException exception)
        {
            _logger.LogWarning(exception, "Bad request: {@Exception}", exception.Message);
            return BadRequest(exception.Message);
        }
    }

    [HttpGet("GetPoll/{pollCode}")]
    public async Task<ActionResult<PollDto>> GetPollByCode(string pollCode)
    {
        try
        {
            _logger.LogInformation("Getting poll details with code {@PollCode} (without results)", pollCode);
            return Ok(await _pollsService.GetPollAsync(pollCode));
        }
        catch (PollException exception)
        {
            _logger.LogWarning(exception, "Bad request: {@Exception}", exception.Message);
            return BadRequest(exception.Message);
        }
    }

    [HttpGet("GetPollResult/{pollCode}")]
    public async Task<ActionResult<PollResultDto>> GetPollResultByCode(string pollCode)
    {
        try
        {
            _logger.LogInformation("Getting poll result with code {@PollCode}", pollCode);
            return Ok(await _pollsService.GetPollResultAsync(pollCode));
        }
        catch (PollException exception)
        {
            _logger.LogWarning(exception, "Bad request: {@Exception}", exception.Message);
            return BadRequest(exception.Message);
        }
    }

    [HttpGet("GetPollsFromTeacher/{teacherGuid:guid}")]
    public async Task<ActionResult<List<PollDto>>> GetPollsFromTeacher(Guid teacherGuid)
    {
        try
        {
            _logger.LogInformation("Getting polls from teacher with guid {@TeacherGuid}", teacherGuid);
            return Ok(await _pollsService.GetPollsOfTeacherAsync(teacherGuid));
        }
        catch (PollException exception)
        {
            _logger.LogWarning(exception, "Bad request: {@Exception}", exception.Message);
            return BadRequest(exception.Message);
        }
    }

    [HttpDelete("DeletePoll/{pollCode}:{teacherGuid:guid}")]
    public async Task<ActionResult<bool>> DeletePoll(string pollCode, Guid teacherGuid)
    {
        try
        {
            _logger.LogInformation("Deleting poll with code {@PollCode}", pollCode);
            if (await _pollsService.DeletePollAsync(pollCode, teacherGuid))
                return Ok();
            _logger.LogWarning("Poll with code {@PollCode} could not be deleted", pollCode);
            return BadRequest("Cannot delete Poll of other Teacher");
        }
        catch (PollException exception)
        {
            _logger.LogWarning(exception, "Bad request: {@Exception}", exception.Message);
            return BadRequest(exception.Message);
        }
    }
}
