using System.ComponentModel.DataAnnotations;

namespace CorePlugin.Plugin.Dtos;

public class PollReplayDto
{
    [Required] public string PollName { get; set; } = null!;
    [Required] public string PollQuestion { get; set; } = null!;
    public Guid CreatedBy { get; set; }
    [Required] public DateTime StartTime { get; set; } = DateTime.Now;
    [Required] public DateTime EndTime { get; set; } = DateTime.Now.AddDays(1);
    [Required] public bool IsMultipleChoice { get; set; }
    [Required] public List<PollOptionReplayDto> PollOptions { get; set; } = new();
}
