import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NoteServiceService } from '../services/note.service';
import { Note } from '../interfaces/note';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss',
})
export class NotesComponent {
  notes: Note[];
  constructor(private noteService: NoteServiceService) {
    this.notes = this.noteService.notes;
  }

  deleteNote(id: number | undefined): void {
    if (id === undefined) {
      alert('Note cannot be deleted... Refresh the page and try again');
      return;
    }
    this.noteService.deleteNote(id);
    this.notes = this.noteService.notes;
  }
}
