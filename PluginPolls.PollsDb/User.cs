using System.ComponentModel.DataAnnotations.Schema;

namespace PluginPolls.PollsDb;

public class User
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long UserId { get; set; }

    public string Uuid { get; set; } = null!;
}