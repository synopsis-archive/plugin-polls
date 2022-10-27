using System.ComponentModel.DataAnnotations;

namespace PluginPolls.PollsDb.Dtos;

public class VoteReplayDto
{
    [Required]
    public int OptionId { get; set; }
    
    [Required]
    public Guid SubmittedBy { get; set; }
}