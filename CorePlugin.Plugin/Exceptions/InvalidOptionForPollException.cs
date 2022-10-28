namespace CorePlugin.Plugin.Exceptions;

public class InvalidOptionForPollException : Exception
{
    public InvalidOptionForPollException(string? message) : base(message) { }
}