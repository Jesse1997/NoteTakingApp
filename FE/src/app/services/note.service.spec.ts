import { TestBed } from '@angular/core/testing';

import { NoteServiceService } from './note.service';

describe('NoteServiceService', () => {
  let service: NoteServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoteServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
