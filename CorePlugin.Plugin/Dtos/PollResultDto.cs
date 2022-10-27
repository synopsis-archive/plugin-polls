using System.ComponentModel.DataAnnotations;

namespace PluginPolls.PollsDb.Dtos;

public class PollResultDto : PollDto
{
    [Required] public Dictionary<PollOptionDto, byte> Results { get; set; } = null!;
}