using System.ComponentModel.DataAnnotations;

namespace CorePlugin.Plugin.Dtos;

public class PollResultDto : PollDto
{
    [Required] public int ReceivedAnswers { get; set; }

    /// <summary>
    /// Key is the PollOptionId
    /// Value is an object which contains the number of votes and the percentage which is calculated by the number of votes and the total number of votes
    /// </summary>
    [Required] public Dictionary<long, ReceivedVotesDto> Results { get; set; } = null!;
}
