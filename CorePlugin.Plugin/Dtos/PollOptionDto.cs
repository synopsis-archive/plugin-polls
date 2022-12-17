using System.ComponentModel.DataAnnotations;

namespace CorePlugin.Plugin.Dtos;

public class PollOptionDto
{
    public long PollOptionId { get; set; }

    [Required]
    public string Description { get; set; } = null!;
}
