using Microsoft.EntityFrameworkCore;

namespace CorePlugin.PollsDb;

public class PollsContext : DbContext
{
    public PollsContext(DbContextOptions options) : base(options) { }

    public DbSet<Poll> Polls { get; set; } = null!;
    public DbSet<PollOption> PollOptions { get; set; } = null!;
    public DbSet<SubmittedVote> PollVotes { get; set; } = null!;
}
