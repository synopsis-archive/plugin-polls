using CorePlugin.Plugin.Dtos;
using CorePlugin.Plugin.Services;
using CorePlugin.PollsDb;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using System.Reflection;

namespace CorePlugin.Polls.Test
{
    public class PollsServiceTest: IDisposable
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
            string sourceDb = @"C:\Temp\5Klasse\POS\plugin-polls\CorePlugin.BackendDevServer\Polls.sqlite3";
            string exeDirectory = Path.GetDirectoryName(Assembly.GetEntryAssembly().Location);
            fileTemporaryDb = Path.Combine(exeDirectory, "database", "Polls.sqlite3");
            if (File.Exists(fileTemporaryDb)) File.Delete(fileTemporaryDb);
            File.Copy(sourceDb, fileTemporaryDb);
           
            string connectionString =
                $@"Data Source={fileTemporaryDb}";
            var options = new DbContextOptionsBuilder<PollsContext>()
                .UseSqlite(connectionString)
                .Options;
            _db = new PollsContext(options);
            _db.Database.EnsureCreated();
            _db.Database.OpenConnection();
        }

        [Fact]
        public async void CheckCreate()
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
        public async void CheckDelete()
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

            Assert.True(await _pollsService.DeletePollAsync(poll.PollCode, new Guid("da3cfdfd-5b66-4d00-a5ae-cd50217f117c")));
        }

    }
}