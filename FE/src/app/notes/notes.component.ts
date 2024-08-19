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
  notes?: Note[];
  constructor(private noteService: NoteServiceService) {
    this.getNotes();
  }

  deleteNote(e: Event, id: number | undefined): void {
    e.stopPropagation();

    if (id === undefined) {
      alert('Note cannot be deleted... Refresh the page and try again');
      return;
    }
    this.noteService.deleteNote(id).subscribe({
      error: () => {
        alert('An error occurred while deleting note');
      },
      complete: () => {
        this.getNotes();
      },
    });
  }

  getNotes(): void {
    this.noteService.getNotes().subscribe({
      next: (data) => {
        this.notes = data;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('Retrieved notes');
      },
    });
  }
}
