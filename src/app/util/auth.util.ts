import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, mapTo, tap, map } from 'rxjs/operators';
import { Tokens } from '@app/model/tokens';
import * as CryptoJS from 'crypto-js';
import { User } from '@app/model/user';
import { IUsersResponse } from '@app/data/IUsersResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthUtil {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private readonly USER_ID = 'USER_ID';
  private readonly USER_ROLE = 'USER_ROLE';
  private readonly USER_NAME = 'USER_NAME';

  public readonly ADMIN_ROLE = 'admin';

  constructor(private http: HttpClient){ }

  register(user: User): Observable<string> {
    user.password = this.saltAndHash(user.password);
    return this.http.post<any>('/api/users/register', user)
      .pipe(
        tap(tokens => {
          this.doLoginUser(user.username, tokens, user.id, user.role);
        }),
        mapTo(""),
        catchError(error => {
          return of(error.error.message);
        })
      );
  };

  login(user: {username: string, password: string, salt: string}): Observable<string> {
    user.password = this.saltAndHash(user.password, user.salt);
    return this.http.post<any>('/api/users/login', user)
      .pipe(
        tap(tokens => this.doLoginUser(user.username, tokens, tokens.id, tokens.role)),
        mapTo("Logged in"),
        catchError(error => {
          return of("Invalid Password");
        })
      );
  };

  salt(username: {username: string}): Observable<string> {
    return this.http.post<any>('/api/users/salt', username)
      .pipe(
        map(response => response.salt),
        catchError(error => {
          return Observable.throw(error);
        })
      );
  }

  logout() {
    return this.http.post<any>('/api/users/logout',{
      'refreshToken': this.getRefreshToken()
    }).pipe(
      tap(() => this.doLogoutUser()),
      mapTo(true),
      catchError(error => {
        alert(error.error);
        return of(false);
      })
    );
  };

  isLoggedIn() {
    return !!this.getJwtToken();
  };

  refreshToken() {
    return this.http.post<any>('/api/users/refresh', {
      'refreshToken': this.getRefreshToken()
    }).pipe(
      tap((tokens: Tokens) => {
        this.storeJwtToken(tokens.jwt);
      })
    );
  };

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  };

  doLoginUser(username: string, tokens: Tokens, id: string, role: string){
    this.storeUserInfo(id, role, username);
    this.storeTokens(tokens);
  };

  doLogoutUser() {
    this.removeUserInfo();
    this.removeTokens();
  };

  getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  };

  storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  };

  storeTokens(tokens: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.jwt);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  };

  removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  };

  saltAndHash(password: string, salt = null) {
    if(salt == null)
      salt = CryptoJS.lib.WordArray.random(128/8);
    return salt.toString() + ":" + CryptoJS.PBKDF2(salt.toString() + password, salt.toString(), {keySize: 128/32});
  };

  storeUserInfo(id: string, role: string, username: string){
    localStorage.setItem(this.USER_ID, id);
    localStorage.setItem(this.USER_ROLE, role);
    localStorage.setItem(this.USER_NAME, username);
  }

  removeUserInfo(){
    localStorage.removeItem(this.USER_ID);
    localStorage.removeItem(this.USER_ROLE);
    localStorage.removeItem(this.USER_NAME);
  }

  getUserId(){
    return localStorage.getItem(this.USER_ID);
  }

  getUserRole(){
    return localStorage.getItem(this.USER_ROLE);
  }

  getUsername(){
    return localStorage.getItem(this.USER_NAME);
  }
}
