import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, exhaustMap, take } from 'rxjs';
import { AuthUser } from 'src/models/AuthUser';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.currentUser.pipe(
      take(1),
      exhaustMap((user) => {
        console.log('User in interceptor:', user);
        user = new AuthUser(user?.email,user?.id,user?.token,user.)
        if (!user || user.isValidToken()) {
          // Handle the case when the token is not valid or the user is not present
          return next.handle(req);
        }

        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user.token),
        });

        return next.handle(modifiedReq);
      })
    );
  }
}
