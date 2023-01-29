using Microsoft.EntityFrameworkCore;

namespace CorePlugin.PollsDb;

public class PollsContext : DbContext
{
    public PollsContext(DbContextOptions options) : base(options) { }

    public DbSet<Poll> Polls { get; set; } = null!;
    public DbSet<PollOption> PollOptions { get; set; } = null!;
    public DbSet<SubmittedVote> PollVotes { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder) => CreateTemplatePolls(modelBuilder);

    private static void CreateTemplatePolls(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Poll>().HasData(
            new Poll
            {
                PollId = 1,
                CreatedBy = new Guid("da3cfdfd-5b66-4d00-a5ae-cd50217f117c"),
                CreatorName = "SYSTEM",
                PollQuestion = "Soll das Plugin installiert werden?",
                EndTime = DateTime.Now.AddYears(1),
                StartTime = DateTime.Now,
                IsMultipleChoice = false,
                PollName = "Plugin Installation",
                PollCode = "AD65ED"
            },
            new Poll
            {
                PollId = 2,
                CreatedBy = new Guid("da3cfdfd-5b66-4d00-a5ae-cd50217f117c"),
                CreatorName = "SYSTEM",
                PollQuestion = "Wieviel ist 3 * 3 + 2?",
                EndTime = DateTime.Now.AddYears(1),
                StartTime = DateTime.Now,
                IsMultipleChoice = false,
                PollName = "Mathe",
                PollCode = "45DDF4"
            }
        );
        modelBuilder.Entity<PollOption>().HasData(
            new PollOption
            {
                PollOptionId = 1,
                Description = "Ja",
                PollId = 1,
            },
            new PollOption
            {
                PollOptionId = 2,
                Description = "Nein",
                PollId = 1,
            },
            new PollOption
            {
                PollOptionId = 3,
                Description = "Keine Ahnung",
                PollId = 1,
            },
            new PollOption
            {
                PollOptionId = 4,
                Description = "5",
                PollId = 2,
            },
            new PollOption
            {
                PollOptionId = 5,
                Description = "11",
                PollId = 2,
            },
            new PollOption
            {
                PollOptionId = 6,
                Description = "15",
                PollId = 2,
            }
        );
        modelBuilder.Entity<SubmittedVote>().HasData(
            new SubmittedVote
            {
                SubmittedVoteId = 1,
                PollId = 2,
                UserId = new Guid("769084e9-e85c-4713-a363-a18474215aa0"),
                SelectedPollOptionId = 5,
            },
            new SubmittedVote()
            {
                SubmittedVoteId = 2,
                PollId = 2,
                UserId = new Guid("11d37d0a-98e0-45e7-a703-c21b10386362"),
                SelectedPollOptionId = 6
            }
        );
    }
}
