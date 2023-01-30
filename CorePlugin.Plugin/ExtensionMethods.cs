using CorePlugin.Plugin.Dtos;
using CorePlugin.PollsDb;

namespace CorePlugin.Plugin;

public static class ExtensionMethods
{
    public static PollResultDto ToPollResultDto(this Poll poll)
    {
        return new PollResultDto
        {
            PollCode = poll.PollCode,
            PollName = poll.PollName,
            PollQuestion = poll.PollQuestion,
            CreatorName = poll.CreatorName,
            StartTime = poll.StartTime,
            EndTime = poll.EndTime,
            IsMultipleChoice = poll.IsMultipleChoice,
            PollOptions = poll.PollOptions.Select(x => new PollOptionDto { PollOptionId = x.PollOptionId, Description = x.Description }).ToList(),
            ReceivedAnswers = poll.SubmittedVotes.Count,
            Results = ConvertPollToResultDictionary(poll)
        };
    }

    public static PollDto ToPollDto(this Poll poll)
    {
        return new PollDto
        {
            PollCode = poll.PollCode,
            PollName = poll.PollName,
            PollQuestion = poll.PollQuestion,
            CreatorName = poll.CreatorName,
            StartTime = poll.StartTime,
            EndTime = poll.EndTime,
            IsMultipleChoice = poll.IsMultipleChoice,
            PollOptions = poll.PollOptions
                .Select(x => new PollOptionDto { PollOptionId = x.PollOptionId, Description = x.Description })
                .ToList(),
        };
    }

    #region Private Helper Methods
    private static Dictionary<string, ReceivedVotesDto> ConvertPollToResultDictionary(Poll poll)
    {
        var submittedVotesCount = poll.SubmittedVotes.Count;

        return poll.PollOptions.ToDictionary(pollOption => pollOption.Description, pollOption =>
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
