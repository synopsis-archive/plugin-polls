using System.ComponentModel.DataAnnotations;

namespace CorePlugin.Plugin.Dtos;

public class VoteReplayDto
{
    [Required]
    public long OptionId { get; set; }
}
