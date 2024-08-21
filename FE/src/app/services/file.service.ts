import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private http: HttpClient) {}

  uploadFile(formData: FormData): Observable<HttpEvent<any>> {
    return this.http.post<HttpEvent<any>>('files', formData);
  }
}
