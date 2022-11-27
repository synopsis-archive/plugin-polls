namespace CorePlugin.Plugin.Exceptions;

public class NotAuthorizedException : PollException
{
    public NotAuthorizedException(string? message) : base(message) { }
}
