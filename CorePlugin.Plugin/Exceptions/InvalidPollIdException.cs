namespace CorePlugin.Plugin.Exceptions;

public class InvalidPollIdException : Exception
{
    public InvalidPollIdException(string? message) : base(message) { }
}