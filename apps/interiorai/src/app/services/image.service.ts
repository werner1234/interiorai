import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private apiUrl = 'http://localhost:3333/api';

  constructor(private http: HttpClient) {}

  generateImage(prompt: string): Observable<any> {
    return this.http.post(this.apiUrl, { prompt }, { responseType: 'blob' });
  }
}
