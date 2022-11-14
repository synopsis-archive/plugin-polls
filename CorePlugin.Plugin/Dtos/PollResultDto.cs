using System.ComponentModel.DataAnnotations;

namespace CorePlugin.Plugin.Dtos;

public class PollResultDto : PollDto
{
    [Required] public int ReceivedAnswers { get; set; }
    [Required] public Dictionary<long, ReceivedVotesDto> Results { get; set; } = null!;
}