import { Routes } from '@angular/router';
import { AddNoteComponent } from './add-note/add-note.component';
import { NotesComponent } from './notes/notes.component';
import { EditNoteComponent } from './edit-note/edit-note.component';

export const routes: Routes = [
  { path: '', title: 'My Notes', component: NotesComponent },
  { path: 'add', title: 'Add Note', component: AddNoteComponent },
  { path: 'edit/:id', title: 'Edit Note', component: EditNoteComponent },
];
