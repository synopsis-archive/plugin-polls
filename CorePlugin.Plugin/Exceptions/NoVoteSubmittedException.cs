namespace CorePlugin.Plugin.Exceptions;

public class NoVoteSubmittedException : PollException
{
    public NoVoteSubmittedException(string? message) : base(message) { }
}
