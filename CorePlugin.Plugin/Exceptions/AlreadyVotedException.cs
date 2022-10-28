namespace CorePlugin.Plugin.Exceptions;

public class AlreadyVotedException : Exception
{
    public AlreadyVotedException(string? message) : base(message) { }
}