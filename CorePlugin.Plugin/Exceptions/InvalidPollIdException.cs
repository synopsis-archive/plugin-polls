namespace CorePlugin.Plugin.Exceptions;

public class InvalidPollIdException : PollException
{
    public InvalidPollIdException(string? message) : base(message) { }
}
