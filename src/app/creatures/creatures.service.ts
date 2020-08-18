import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CreaturesService{
  constructor(private http: HttpClient) { }

  getAllCreatures() {
    return this.http.get('http://localhost:3000/api/creatures');
  }

}
