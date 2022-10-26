using System.ComponentModel.DataAnnotations.Schema;

namespace CorePlugin.PollsDb;

public class PollOption
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long PollOptionId { get; set; }

    public string Description { get; set; } = null!;
    
    public long PollId { get; set; }
    public Poll Poll { get; set; } = null!;
}