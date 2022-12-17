namespace CorePlugin.Plugin.Exceptions;

public class NotMultipleChoiceException : PollException
{
    public NotMultipleChoiceException(string? message) : base(message) { }
}
