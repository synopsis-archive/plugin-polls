using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CorePlugin.PollsDb
{
    public static class DbSeederExtension
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {
            using (var reader = new StreamReader(@"fillData.csv"))
            {
                while (!reader.EndOfStream)
                {
                    string line = reader.ReadLine();
                    string[] values = line.Split(';');

                    List<PollOption> GenericOptions = new List<PollOption>();
                    GenericOptions.Add(new PollOption() { PollOptionId = 1, Description = "Option1" });
                    GenericOptions.Add(new PollOption() { PollOptionId = 1, Description = "Option2" });
                    GenericOptions.Add(new PollOption() { PollOptionId = 1, Description = "Option3" });
                    GenericOptions.Add(new PollOption() { PollOptionId = 1, Description = "Option4" });

                    List<PollOption> options = new List<PollOption>();
                    for (int i = 0; i < int.Parse(values[6]); i++)
                    {
                        options.Add(GenericOptions.ElementAt(i));
                    }

                    modelBuilder.Entity<Poll>().HasData(new Poll()
                    {
                        PollCode = values[0],
                        PollName = values[1],
                        CreatorName = values[2],
                        StartTime = DateTime.Parse(values[3]),
                        EndTime = DateTime.Parse(values[4]),
                        IsMultipleChoice = Boolean.Parse(values[5]),
                        PollQuestion = values[7],
                        PollOptions = options
                    });
                }
            }
            
        }
    }
}
