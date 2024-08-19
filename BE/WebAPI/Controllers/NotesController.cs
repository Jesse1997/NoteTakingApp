using Microsoft.AspNetCore.Mvc;
using System.Collections.ObjectModel;
using System.Text.Json;
using WebAPI.Model;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NotesController : ControllerBase
    {
        private static ICollection<Note> notes = 
            JsonSerializer.Deserialize<Collection<Note>>(System.IO.File.ReadAllText("db/data.json")) 
            ?? new Collection<Note>();

        private readonly ILogger<NotesController> _logger;

        public NotesController(ILogger<NotesController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetNotes")]
        public ActionResult<IEnumerable<Note>> Get()
        {
            return Ok(notes);
        }

        [HttpPost(Name = "AddNote")]
        public ActionResult<Note> Add(Note note)
        {
            note.Id = GenerateUniqueID();
            notes.Add(note);
            SaveChanges();
            return CreatedAtAction(nameof(Get), new { id = note.Id }, note);
        }

        [HttpPut("{id}")]
        public ActionResult<Note> Update([FromRoute]int id, Note note)
        {
            var noteToUpdate = notes.FirstOrDefault(x => x.Id == id);
            if (noteToUpdate == null)
            {
                return NotFound();
            }

            noteToUpdate.Title = note.Title;
            noteToUpdate.Description = note.Description;
            SaveChanges();
            return Ok(noteToUpdate);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete([FromRoute]int id)
        {
            var noteToDelete = notes.FirstOrDefault(y => y.Id == id);
            if (noteToDelete == null)
            {
                return NotFound();
            }

            notes.Remove(noteToDelete);
            SaveChanges();
            return Ok();
        }

        [HttpGet("{id}")]
        public IActionResult Get([FromRoute]int id)
        {
            var note = notes.FirstOrDefault(y => y.Id == id);
            if (note == null)
            {
                return NotFound();
            }
            return Ok(note);
        }

        private int GenerateUniqueID()
        {
            var random = new Random();
            var id = random.Next(int.MaxValue);

            while (notes.Any(x => x.Id == id))
            {
                id = random.Next(int.MaxValue);
            }
            return id;
        }

        private void SaveChanges()
        {
            string json = JsonSerializer.Serialize(notes);
            System.IO.File.WriteAllText("db/data.json", json);
        }
    }
}
