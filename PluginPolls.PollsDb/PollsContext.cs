using Microsoft.EntityFrameworkCore;

namespace PluginPolls.PollsDb;

public class PollsContext: DbContext
{
    public PollsContext(DbContextOptions options): base(options) { }
    
    public DbSet<User> Users { get; set; } = null!;
    public DbSet<Poll> Polls { get; set; } = null!;
    public DbSet<PollOption> PollOptions { get; set; } = null!;
    public DbSet<SubmittedVote> PollVotes { get; set; } = null!;
}