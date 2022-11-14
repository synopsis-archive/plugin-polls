using System.ComponentModel.DataAnnotations.Schema;

namespace CorePlugin.PollsDb;

public class Poll
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long PollId { get; set; }

    public string PollCode { get; set; } = null!;
    public string PollName { get; set; } = null!;
    public string PollQuestion { get; set; } = null!;
    public Guid CreatedBy { get; set; }
    public DateTime StartTime { get; set; } = DateTime.Now;
    public DateTime EndTime { get; set; } = DateTime.Now.AddDays(7);
    public bool IsMultipleChoice { get; set; }

    public virtual List<PollOption> PollOptions { get; set; } = null!;
    public virtual List<SubmittedVote> SubmittedVotes { get; set; } = null!;
}
