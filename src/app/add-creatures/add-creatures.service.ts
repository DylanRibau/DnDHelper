import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ICreature } from '@app/data/ICreature.js';

@Injectable({
  providedIn: 'root'
})
export class AddCreaturesService{
  creature: ICreature;

  constructor(private http: HttpClient) { }

  postCreature(creature){
    return this.http.post('/api/creatures/send', creature);
  };

  putCreature(creature){
    return this.http.put('/api/creatures', creature);
  }
}
