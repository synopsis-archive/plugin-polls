namespace CorePlugin.Plugin.Exceptions;

public class PollClosedException : PollException
{
    public PollClosedException(string? message) : base(message) { }
}
