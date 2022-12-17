﻿using System.ComponentModel.DataAnnotations.Schema;

namespace CorePlugin.PollsDb;

public class SubmittedVote
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long SubmittedVoteId { get; set; }

    public long SelectedPollOptionId { get; set; }
    public PollOption SelectedPollOption { get; set; } = null!;

    public long PollId { get; set; }
    public Poll Poll { get; set; } = null!;

    public Guid UserId { get; set; }
}
