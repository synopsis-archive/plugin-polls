namespace CorePlugin.Plugin.Exceptions;

public class InvalidOptionForPollException : PollException
{
    public InvalidOptionForPollException(string? message) : base(message) { }
}
