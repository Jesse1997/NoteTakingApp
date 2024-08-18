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
    const note = this.noteService.getNoteById(Number(this.id as string));

    this.noteForm.setValue({
      title: note.title,
      description: note.description,
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.noteForm.invalid) {
      alert('Please fill in the required fields');
      return;
    }
    this.noteService.updateNote({
      id: Number(this.id),
      title: this.noteForm.value.title ?? 'No title',
      description: this.noteForm.value.description ?? 'No description',
    });

    this.router.navigate(['/']);
  }
}
