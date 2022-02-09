import { catchError, tap } from 'rxjs/operators';
import { environment } from './../../../../environments/environment.prod';
import {
  Roles,
  LoginInterface,
  LoginRespInterface,
} from './../interfaces/login.interface';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}
  //Observers
  private logged = new BehaviorSubject<boolean>(false);
  getLogged(): Observable<boolean> {
    return this.logged.asObservable();
  }
  private role = new BehaviorSubject<Roles>(null);
  getRole(): Observable<Roles> {
    return this.role.asObservable();
  }
  //Sign In
  sigIn(user: LoginInterface): Observable<LoginRespInterface> {
    return this.http
      .post<LoginRespInterface>(`${environment.URL_API}/login/signin`, user)
      .pipe(
        tap((resp) => {
          if (resp.msg == 'ok') {
            this.saveInLocalStorage(resp);
            this.logged.next(true);
            this.role.next(resp.role!);
            window.alert(`Bienvenido ${resp.username}`);
            this.router.navigate(['/home']);
          }
        }),
        catchError((err) => this.handlerError(err))
      );
  }
  //Log Out
  logOut(): void {
    this.logged.next(false);
    this.role.next(null);
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  //Save in Local Storage
  saveInLocalStorage(data: LoginRespInterface): void {
    localStorage.setItem('username', data.username!);
    localStorage.setItem('role', data.role!);
    localStorage.setItem('token', data.token!);
  }
  //Handler Error
  handlerError(err: HttpErrorResponse): Observable<never> {
    const { error } = err;
    let msgResp = 'Error Unknow';
    if (error.msg) msgResp = error.msg;
    window.alert(msgResp);
    return throwError(msgResp);
  }
}
