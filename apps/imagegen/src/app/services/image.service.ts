import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private apiUrl = 'http://localhost:3334/api';

  constructor(private http: HttpClient) {
  }

  generateImage(prompt: string, refImageUrl: string): Observable<any> {
    return this.http.post(this.apiUrl, {prompt, refImageUrl}, {responseType: 'blob'});
  }
}
