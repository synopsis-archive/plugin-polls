using System.ComponentModel.DataAnnotations;

namespace PluginPolls.PollsDb.Dtos;

public class PollOptionDto
{
    [Required]
    public long PollOptionId { get; set; }
    
    [Required]
    public string Description { get; set; } = null!;
}