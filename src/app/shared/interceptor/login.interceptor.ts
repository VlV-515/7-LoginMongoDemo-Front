import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LoginInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.url.includes('checkToken')) {
      const usernameLS = localStorage.getItem('username');
      const roleLS = localStorage.getItem('role');
      const tokenLS = localStorage.getItem('token');
      const req = request.clone({
        setHeaders: {
          username: usernameLS!,
          role: roleLS!,
          token: tokenLS!,
        },
      });
      return next.handle(req);
    }
    return next.handle(request);
  }
}
