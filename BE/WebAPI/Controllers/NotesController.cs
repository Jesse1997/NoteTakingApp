using Microsoft.AspNetCore.Mvc;
using System.Collections.ObjectModel;
using WebAPI.Model;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NotesController : ControllerBase
    {
        private ICollection<Note> notes = new Collection<Note>();

        private readonly ILogger<NotesController> _logger;

        public NotesController(ILogger<NotesController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetNotes")]
        public IEnumerable<Note> Get()
        {
            return notes;
        }
    }
}
