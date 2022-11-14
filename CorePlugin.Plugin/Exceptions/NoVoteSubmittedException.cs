namespace CorePlugin.Plugin.Exceptions;

public class NoVoteSubmittedException : Exception
{
    public NoVoteSubmittedException(string? message) : base(message) { }
}
