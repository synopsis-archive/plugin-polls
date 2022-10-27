using System.ComponentModel.DataAnnotations;

namespace PluginPolls.PollsDb.Dtos;

public class PollOptionReplayDto
{
    [Required] public string Description { get; set; }
}