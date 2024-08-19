import { Injectable } from '@angular/core';
import { Note } from '../interfaces/note';
import { HttpClient } from '@angular/common/http';
import { get } from 'http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NoteServiceService {
  public notes: Note[] = [];

  constructor(private http: HttpClient) {
    this.getNotes().subscribe((notes) => {
      this.notes = notes;
    });
  }

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>('notes');
  }

  addNote(note: Note): Observable<Note> {
    return this.http.post<Note>('notes', note);
  }

  deleteNote(id: number): Observable<Object> {
    return this.http.delete('notes/' + id);
  }

  getNoteById(id: number): Observable<Note> {
    return this.http.get<Note>('notes/' + id);
  }

  updateNote(note: Note): Observable<Note> {
    return this.http.put<Note>('notes/' + note.id, note);
  }
}
