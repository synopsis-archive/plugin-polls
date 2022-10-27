using PluginPolls.PollsDb.Dtos;

namespace PluginPolls.PollsDb.Services;

public interface IPollsService
{
    /*
     * Gets all polls of a teacher without results ("Home - Lehrer" in mockup)
     */
    Task<PollDto> GetPollsOfTeacherAsync(Guid teacherGuid);
 
    /*
     * Creates a new Poll (Endpoint for "Lehreransicht")
     */
    Task<PollResultDto> CreatePollAsync(PollReplayDto pollDto, Guid teacherGuid);
    
    /*
     * Gets a poll without any results ("Schüleransicht" in mockup)
     */
    Task<PollDto> GetPollAsync(string code);
    
    /*
     * Gets the result of an existing poll ("Ergebnisansicht" in mockup) or on button "Ergebnis ansehen" click
     */
    Task<PollResultDto> GetPollResultAsync(string code);

    /*
     * Submits a vote for a poll ("Schüleransicht" in mockup) and returns the result -> "Ergebnisansicht"
     */
    Task<PollResultDto> SubmitVotesAsync(string code, List<VoteReplayDto> voteReplayDtos);
    
    /*
     * Closes a poll earlier than previously entered date
     */
    Task<PollResultDto> ClosePollAsync(string code, Guid teacherGuid);
    
    /*
     * Deletes a poll ("Home - Lehrer" in mockup)
     */
    Task<bool> DeletePollAsync(string code, Guid teacherGuid);
}