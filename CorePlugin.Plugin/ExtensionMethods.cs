//----------------------------------------
//   CopyPropertiesFrom - Methods 
//   (C)Robert Grueneis/HTL Grieskirchen
//   Edited by EinboeckFranz
//----------------------------------------

using CorePlugin.Plugin.Dtos;
using CorePlugin.PollsDb;

namespace CorePlugin.Plugin;

public static class ExtensionMethods
{
    public static T CopyPropertiesFrom<T>(this T target, object source) 
        => CopyPropertiesFrom(target, source, null);

    public static PollResultDto ToPollResultDto(this Poll poll)
    {
        return new PollResultDto
        {
            PollCode = poll.PollCode,
            CreatedBy = poll.CreatedBy,
            StartTime = poll.StartTime,
            EndTime = poll.EndTime,
            IsMultipleChoice = poll.IsMultipleChoice,
            PollOptions = poll.PollOptions.Select(x => new PollOptionDto().CopyPropertiesFrom(x)).ToList(),
            ReceivedAnswers = poll.SubmittedVotes.Count,
            Results = ConvertPollToResultDictionary(poll)
        };
    }

    public static void LogSuccess(this string message)
    {
        Console.BackgroundColor = ConsoleColor.Green;
        Console.WriteLine($"[{DateTime.Now:dd.MM.yyyy HH:mm:ss}]: {message}");
        Console.BackgroundColor = ConsoleColor.Black;
    }
    
    public static void LogError(this string message)
    {
        Console.BackgroundColor = ConsoleColor.Red;
        Console.WriteLine($"[{DateTime.Now:dd.MM.yyyy HH:mm:ss}]: {message}");
        Console.BackgroundColor = ConsoleColor.Black;
    }

    #region Private Helper Methods
    private static T CopyPropertiesFrom<T>(this T target, object source, string[]? ignoreProperties)
    {
        if (target == null) return target;
        ignoreProperties ??= Array.Empty<string>();
        var propsSource = source.GetType().GetProperties().Where(x => x.CanRead && !ignoreProperties.Contains(x.Name));
        var propsTarget = target.GetType().GetProperties().Where(x => x.CanWrite);

        propsTarget
            .Where(prop => propsSource.Any(x => x.Name == prop.Name))
            .ToList()
            .ForEach(prop =>
            {
                var propSource = propsSource.First(x => x.Name == prop.Name);
                prop.SetValue(target, propSource.GetValue(source));
            });
        return target;
    }
    
    private static Dictionary<PollOptionDto, ReceivedVotesDto> ConvertPollToResultDictionary(Poll poll)
    {
        var submittedVotesCount = poll.SubmittedVotes.Count;
        
        return poll.PollOptions.ToDictionary(pollOption => new PollOptionDto().CopyPropertiesFrom(pollOption), pollOption =>
        {
            var votesForOption = poll.SubmittedVotes.Count(x => x.SelectedPollOptionId == pollOption.PollOptionId);
            var percentage = (byte)Math.Round((double)votesForOption / submittedVotesCount * 100, 0);
            
            return new ReceivedVotesDto
            {
                Percentage = percentage,
                ReceivedVotes = votesForOption
            };
        });
    }
    #endregion
}