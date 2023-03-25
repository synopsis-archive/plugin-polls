using CorePlugin.Plugin.Dtos;
using CorePlugin.Plugin.Services;
using CorePlugin.PollsDb;
using Microsoft.EntityFrameworkCore;

namespace CorePlugin.Polls.Test;

public class PollsServiceTest : IDisposable
{
    private readonly PollsService _pollsService;
    private PollsContext _db;

    public PollsServiceTest()
    {
        InitDatabase();
        _pollsService = new PollsService(_db);
    }

    public void Dispose() => _db.Database.EnsureDeleted();

    private void InitDatabase()
    {
        var options = new DbContextOptionsBuilder<PollsContext>()
            .UseInMemoryDatabase("PollsDb")
            .Options;
        _db = new PollsContext(options);
        _db.Database.EnsureCreated();
    }

    [Fact]
    public async Task CheckCreate()
    {
        var pollReplayDtos = new List<PollOptionReplayDto>();
        pollReplayDtos.Add(new PollOptionReplayDto { Description = "Ja" });
        pollReplayDtos.Add(new PollOptionReplayDto { Description = "Na" });
        var poll = await _pollsService.CreatePollAsync(new PollReplayDto
        {
            StartTime = DateTime.Now,
            EndTime = DateTime.Now.AddDays(2),
            IsMultipleChoice = true,
            PollName = "Funktioniert dieser Unit-Test?",
            PollOptions = pollReplayDtos,
            PollQuestion = "Funktioniert dieser Unit-Test?"
        }, new Guid("da3cfdfd-5b66-4d00-a5ae-cd50217f117c"), "Tester");

        if ((await _pollsService.GetPollAsync(poll.PollCode)) == null)
            Assert.Fail("Pass nix");
    }

    [Fact]
    public async Task CheckDelete()
    {
        var pollReplayDtos = new List<PollOptionReplayDto>
        {
            new() { Description = "Ja" },
            new() { Description = "Na" }
        };
        var poll = await _pollsService.CreatePollAsync(new PollReplayDto
        {
            StartTime = DateTime.Now,
            EndTime = DateTime.Now.AddDays(2),
            IsMultipleChoice = true,
            PollName = "Funktioniert dieser Unit-Test?",
            PollOptions = pollReplayDtos,
            PollQuestion = "Funktioniert dieser Unit-Test?"
        }, new Guid("da3cfdfd-5b66-4d00-a5ae-cd50217f117c"), "Tester");

        Assert.True(
            await _pollsService.DeletePollAsync(poll.PollCode, new Guid("da3cfdfd-5b66-4d00-a5ae-cd50217f117c")));
    }

    [Fact]
    public async Task CheckSubmit()
    {
        var pollReplayDtos = new List<PollOptionReplayDto>
        {
            new() { Description = "Ja" },
            new() { Description = "Na" }
        };
        var poll = await _pollsService.CreatePollAsync(new PollReplayDto
        {
            StartTime = DateTime.Now,
            EndTime = DateTime.Now.AddDays(2),
            IsMultipleChoice = true,
            PollName = "Funktioniert dieser Unit-Test?",
            PollOptions = pollReplayDtos,
            PollQuestion = "Funktioniert dieser Unit-Test?"
        }, new Guid("da3cfdfd-5b66-4d00-a5ae-cd50217f117c"), "Tester");
        var list = poll.PollOptions.Select(x => x.PollOptionId).ToList();
        var countBefore = poll.Results.Count;
        var votes = list.Select(i => new VoteReplayDto { OptionId = i }).ToList();
        var poll2 = await _pollsService.SubmitVotesAsync(poll.PollCode,
            new Guid("da3cfdfd-5b66-4d00-a5ae-cd50217f117c"), votes);

        if (poll2.Results.Count < countBefore) Assert.Fail("Pass nix");
    }

    [Fact]
    public async Task CheckResult()
    {
        var pollReplayDtos = new List<PollOptionReplayDto>
        {
            new() { Description = "Ja" },
            new() { Description = "Na" }
        };
        var poll = await _pollsService.CreatePollAsync(new PollReplayDto
        {
            StartTime = DateTime.Now,
            EndTime = DateTime.Now.AddDays(2),
            IsMultipleChoice = true,
            PollName = "Funktioniert dieser Unit-Test?",
            PollOptions = pollReplayDtos,
            PollQuestion = "Funktioniert dieser Unit-Test?"
        }, new Guid("da3cfdfd-5b66-4d00-a5ae-cd50217f117c"), "Tester");
        var pollOptionYesId = poll.PollOptions.Where(x => x.Description == "Ja").Select(x => x.PollOptionId)
            .FirstOrDefault();
        var pollOptionNoId = poll.PollOptions.Where(x => x.Description == "Na").Select(x => x.PollOptionId)
            .FirstOrDefault();
        var votes = new List<VoteReplayDto>();
        var yesCounter = 0;
        var noCounter = 0;

        while (yesCounter < 6)
        {
            votes.Add(new VoteReplayDto { OptionId = pollOptionYesId });
            yesCounter++;
        }

        while (noCounter < 4)
        {
            votes.Add(new VoteReplayDto { OptionId = pollOptionNoId });
            noCounter++;
        }

        var poll2 = await _pollsService.SubmitVotesAsync(poll.PollCode,
            new Guid("da3cfdfd-5b66-4d00-a5ae-cd50217f117c"), votes);

        if (poll2.Results.Values.Select(x => Convert.ToInt32(x.Percentage)).First() > 60) Assert.Fail("Pass nix");
    }


    [Fact]
    public async Task CheckClose()
    {
        var pollReplayDtos = new List<PollOptionReplayDto>
        {
            new() { Description = "Ja" },
            new() { Description = "Na" }
        };
        var poll = await _pollsService.CreatePollAsync(new PollReplayDto
        {
            StartTime = DateTime.Now,
            EndTime = DateTime.Now.AddDays(2),
            IsMultipleChoice = true,
            PollName = "Funktioniert dieser Unit-Test?",
            PollOptions = pollReplayDtos,
            PollQuestion = "Funktioniert dieser Unit-Test?"
        }, new Guid("da3cfdfd-5b66-4d00-a5ae-cd50217f117c"), "Tester");
        var test = await _pollsService.ClosePollAsync(poll.PollCode, new Guid("da3cfdfd-5b66-4d00-a5ae-cd50217f117c"));
        Assert.False(test.EndTime.Equals(poll.EndTime));
    }
}
