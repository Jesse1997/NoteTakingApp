import { Injectable } from '@angular/core';
import { Note } from '../interfaces/note';
import { HttpClient } from '@angular/common/http';
import { get } from 'http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NoteServiceService {
  // Should be API call later to retrieve notes
  public notes: Note[] = [];

  constructor(private http: HttpClient) {
    this.getNotes().subscribe((notes) => {
      this.notes = notes;
    });
  }

  // Should be API call later to retrieve notes
  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>('notes');
  }

  // Should be API call later to add note
  addNote(note: Note): void {
    note.id = this.notes.length + 1; // API will return valid note with id
    this.notes.push(note);
  }

  // Should be API call later to delete note
  deleteNote(id: number): void {
    this.notes = this.notes.filter((note) => note.id !== id);
  }

  // Should be API call later to get note by id
  getNoteById(id: number): Note {
    return this.notes.find((note) => note.id === id) as Note;
  }

  // Should be API call later to update note
  updateNote(note: Note): void {
    const index = this.notes.findIndex((n) => n.id === note.id);
    this.notes[index] = note;
  }
}
