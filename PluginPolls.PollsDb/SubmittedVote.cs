using System.ComponentModel.DataAnnotations.Schema;

namespace PluginPolls.PollsDb;

public class SubmittedVote
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long VoteId { get; set; }

    public long SelectedOptionId { get; set; }
    public PollOption SelectedPollOption { get; set; } = null!;
    
    public Guid UserId { get; set; } 
}