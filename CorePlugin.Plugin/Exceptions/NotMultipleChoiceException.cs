namespace CorePlugin.Plugin.Exceptions;

public class NotMultipleChoiceException : Exception
{
    public NotMultipleChoiceException(string? message) : base(message) { }
}