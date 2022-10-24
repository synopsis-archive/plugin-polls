using Microsoft.AspNetCore.Mvc;

namespace PluginPolls.Backend;

[ApiController]
[Route("[controller]")]
public class PollsController : ControllerBase
{
    public IActionResult Index()
    {
        return null!;
    }
}