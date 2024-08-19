import { Component, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NoteServiceService } from '../services/note.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-note',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-note.component.html',
  styleUrl: './edit-note.component.scss',
})
export class EditNoteComponent {
  id: string | null;

  noteForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  constructor(
    private noteService: NoteServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id === null) {
      alert('Note not found');
      this.router.navigate(['/']);
      return;
    }

    this.noteService.getNoteById(Number(this.id)).subscribe({
      next: (data) => {
        this.noteForm.setValue({
          title: data.title,
          description: data.description,
        });
      },
      error: () => {
        alert('An error occurred while retrieving note');
      },
      complete: () => {
        console.log('Retrieved note with id ' + this.id);
      },
    });
  }

  onSubmit(): void {
    if (this.noteForm.invalid) {
      alert('Please fill in the required fields');
      return;
    }

    this.noteService
      .updateNote({
        id: Number(this.id),
        title: this.noteForm.value.title ?? 'No title',
        description: this.noteForm.value.description ?? 'No description',
      })
      .subscribe({
        error: () => {
          alert('An error occurred while updating note');
        },
        complete: () => {
          console.log('Updated note with id ' + this.id);
          this.router.navigate(['/']);
        },
      });
  }
}
