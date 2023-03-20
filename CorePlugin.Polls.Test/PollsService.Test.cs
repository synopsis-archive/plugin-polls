using CorePlugin.Plugin.Dtos;
using CorePlugin.Plugin.Services;
using CorePlugin.PollsDb;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using System.Reflection;

namespace CorePlugin.Polls.Test;

[Collection("Sequential")]
public class PollsServiceTest : IDisposable
{
    private readonly PollsService _pollsService;
    private PollsContext _db;
    private string fileTemporaryDb;

    public PollsServiceTest()
    {
        InitDatabase();
        _pollsService = new PollsService(_db);
    }

    public void Dispose()
    {
        _db.Database.CloseConnection();
    }

    private void InitDatabase()
    {
        //"C:\\Temp\\5Klasse\\POS\\plugin-polls\\CorePlugin.Polls.Test\\bin\\Debug\\net6.0"
        var test = Environment.CurrentDirectory.Split("\\plugin-polls\\");
        var test2 = test[0] + "\\plugin-polls\\CorePlugin.BackendDevServer\\Polls.sqlite3";
        string sourceDb = test2;
        string exeDirectory = Path.GetDirectoryName(Assembly.GetEntryAssembly().Location);
        fileTemporaryDb = Path.Combine(exeDirectory, "TemporaryDbs", "Polls.sqlite3");

        string connectionString =
            $@"Data Source={fileTemporaryDb}";
        var options = new DbContextOptionsBuilder<PollsContext>()
            .UseSqlite(connectionString)
            .Options;
        _db = new PollsContext(options);
        //if (File.Exists(fileTemporaryDb))
        //{
        //    File.Delete(fileTemporaryDb);
        //}
        _db.Database.EnsureDeleted();
        File.Copy(sourceDb, fileTemporaryDb);

        _db.Database.EnsureCreated();
        _db.Database.OpenConnection();

    }

    [Fact]
    public async Task CheckCreate()
    {
        int countBefore = _db.Polls.Count();
        List<PollOptionReplayDto> pollReplayDtos = new List<PollOptionReplayDto>();
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

        if (await _pollsService.GetPollAsync(poll.PollCode) == null)
        {
            Assert.Fail("Pass nix");
        }
    }

    [Fact]
    public async Task CheckDelete()
    {
        int countBefore = _db.Polls.Count();
        List<PollOptionReplayDto> pollReplayDtos = new List<PollOptionReplayDto>
        {
            new PollOptionReplayDto { Description = "Ja" },
            new PollOptionReplayDto { Description = "Na" }
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

        Assert.True(await _pollsService.DeletePollAsync(poll.PollCode, new Guid("da3cfdfd-5b66-4d00-a5ae-cd50217f117c")));
    }

    [Fact]
    public async Task CheckSubmit()
    {
        List<PollOptionReplayDto> pollReplayDtos = new List<PollOptionReplayDto>
        {
            new PollOptionReplayDto { Description = "Ja" },
            new PollOptionReplayDto { Description = "Na" }
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
        int countserBefore = poll.Results.Count();
        List<VoteReplayDto> votes = new List<VoteReplayDto>();
        foreach (int i in list)
        {
            votes.Add(new VoteReplayDto { OptionId = i });
        }
        var poll2 = await _pollsService.SubmitVotesAsync(poll.PollCode, new Guid("da3cfdfd-5b66-4d00-a5ae-cd50217f117c"), votes);

        if (poll2.Results.Count < countserBefore)
        {
            Assert.Fail("Pass nix");
        }
    }

    [Fact]
    public async Task CheckResult()
    {
        List<PollOptionReplayDto> pollReplayDtos = new List<PollOptionReplayDto>
        {
            new PollOptionReplayDto { Description = "Ja" },
            new PollOptionReplayDto { Description = "Na" }
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
        var pollOptionYesId = poll.PollOptions.Where(x => x.Description == "Ja").Select(x => x.PollOptionId).FirstOrDefault();
        var pollOptionNoId = poll.PollOptions.Where(x => x.Description == "Na").Select(x => x.PollOptionId).FirstOrDefault();
        var list = poll.PollOptions.Select(x => x.PollOptionId).ToList();
        int countserBefore = poll.Results.Count();
        List<VoteReplayDto> votes = new List<VoteReplayDto>();
        int yescount = 0;
        int nocount = 0;
        while (yescount < 6)
        {
            votes.Add(new VoteReplayDto { OptionId = pollOptionYesId });
            yescount++;
        }
        while (nocount < 4)
        {
            votes.Add(new VoteReplayDto { OptionId = pollOptionNoId });
            nocount++;
        }
        var poll2 = await _pollsService.SubmitVotesAsync(poll.PollCode, new Guid("da3cfdfd-5b66-4d00-a5ae-cd50217f117c"), votes);

        if (poll2.Results.Values.Select(x => Convert.ToInt32(x.Percentage)).First() > 60)
        {
            Assert.Fail("Pass nix");
        }
    }



    [Fact]
    public async Task CheckClose()
    {
        List<PollOptionReplayDto> pollReplayDtos = new List<PollOptionReplayDto>
        {
            new PollOptionReplayDto { Description = "Ja" },
            new PollOptionReplayDto { Description = "Na" }
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
