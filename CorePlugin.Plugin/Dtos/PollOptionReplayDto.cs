using System.ComponentModel.DataAnnotations;

namespace CorePlugin.Plugin.Dtos;

public class PollOptionReplayDto
{
    [Required] public string Description { get; set; } = null!;
}