namespace CorePlugin.Plugin.Exceptions;

public class InconsistentUserException : PollException
{
    public InconsistentUserException(string? message) : base(message) { }
}
