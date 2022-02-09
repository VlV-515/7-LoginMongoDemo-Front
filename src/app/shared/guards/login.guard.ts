import { LoginService } from './../../pages/login/services/login.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(
    private readonly loginSvc: LoginService,
    private readonly router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.loginSvc.getLogged().pipe(
      take(1),
      map((logged) => {
        if (!logged) return true;
        this.router.navigate(['/home']);
        return false;
      })
    );
  }
}
