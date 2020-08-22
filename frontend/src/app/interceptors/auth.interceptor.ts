import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { TokenService } from '../services/token.service';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { switchMap, filter, take, catchError, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.tokenService.checkTokens()) {
      request = this.addToken(request, this.tokenService.getAccessToken());
    }

    return next.handle(request).pipe(
      catchError(({ error }) => {
        if (error.statusCode === 401) {
          if (error.message === 'Expired access token') {
            return this.handle401Error(request, next);
          }
          if (error.message === 'Invalid refresh token' || error.message === 'Expired refresh token') {
            this.tokenService.removeTokens();
            this.router.navigate(['auth', 'login']);
          }
        }
        return throwError(error);
      })
    ) as Observable<HttpEvent<any>>;
  }

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.tokenService.refreshTokens().pipe(
        switchMap((tokens) => {
          this.refreshTokenSubject.next(tokens.refreshToken);
          return next.handle(this.addToken(request, tokens.accessToken));
        }),
        finalize(() => this.isRefreshing = false)
      );

    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(token => {
          return next.handle(this.addToken(request, token));
        })
      );
    }
  }
}
