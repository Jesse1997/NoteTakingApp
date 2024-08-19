import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NoteServiceService } from '../services/note.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-note',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-note.component.html',
  styleUrl: './add-note.component.scss',
})
export class AddNoteComponent {
  noteForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  constructor(
    private noteService: NoteServiceService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (this.noteForm.invalid) {
      alert('Please fill in the required fields');
      return;
    }
    this.noteService
      .addNote({
        title: this.noteForm.value.title ?? 'No title',
        description: this.noteForm.value.description ?? 'No description',
      })
      .subscribe({
        error: () => {
          alert('An error occurred while adding note');
        },
        complete: () => {
          console.log('Note added');
          this.router.navigate(['/']);
        },
      });
  }
}
