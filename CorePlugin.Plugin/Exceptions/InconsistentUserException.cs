namespace CorePlugin.Plugin.Exceptions;

public class InconsistentUserException : Exception
{
    public InconsistentUserException(string? message) : base(message) { }
}