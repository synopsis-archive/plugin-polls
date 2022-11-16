namespace CorePlugin.Plugin.Exceptions;

public class AlreadyVotedException : PollException
{
    public AlreadyVotedException(string? message) : base(message) { }
}
