namespace CorePlugin.Plugin.Exceptions;

public abstract class PollException : Exception
{
    protected PollException(string? message) : base(message) { }
}