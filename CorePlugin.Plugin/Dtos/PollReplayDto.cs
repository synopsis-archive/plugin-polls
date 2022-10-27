using System.ComponentModel.DataAnnotations;

namespace PluginPolls.PollsDb.Dtos;

public class PollReplayDto
{
    [Required] public Guid CreatedBy { get; set; }
    [Required] public DateTime StartTime { get; set; } = DateTime.Now;
    [Required] public DateTime EndTime { get; set; } = DateTime.Now.AddDays(1);
    [Required] public bool IsMultipleChoice { get; set; }
    [Required] public List<PollOptionReplayDto> PollOptions { get; set; } = new();
}