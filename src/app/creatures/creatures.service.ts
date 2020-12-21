import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CreaturesService{
  constructor(private http: HttpClient) { }

  getAllCreatures(id: string) {
    return this.http.get('/api/creatures/' + id);
  }

  deleteCreature(id){
    return this.http.delete('/api/creatures/' + id);
  }
}
