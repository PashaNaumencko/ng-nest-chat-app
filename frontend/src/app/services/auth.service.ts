import { Injectable } from '@angular/core';
import { HttpInternalService } from './http-internal.service';
import { TokenService } from './token.service';
import { UserDTO } from '../modules/auth/models/UserDTO';
import { IAuthResponse } from '../modules/auth/models/IAuthResponse';
import { CredentialsDTO } from '../modules/auth/models/CredentialsDTO';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventService } from './event.service';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public apiPrefix = 'auth';
  private user: UserDTO;

  constructor(
    private httpService: HttpInternalService,
    private tokenService: TokenService,
    private eventService: EventService,
    private userService: UserService,
    private router: Router
  ) { }

  public getUser(): Observable<UserDTO> {
    return this.user
      ? of(this.user)
      : this.userService.getUserFromToken().pipe(
        map((response) => {
          this.setUser(response);
          return response;
        })
      );
  }

  public setUser(user: UserDTO): void {
    this.user = user;
    this.eventService.changeUser(this.user);
  }

  public login(credentials: CredentialsDTO): Observable<IAuthResponse> {
    return this.subscribeAuthResponse(this.httpService.post<IAuthResponse>(`${this.apiPrefix}/login`, credentials));
  }

  public register(user: UserDTO): Observable<IAuthResponse> {
    return this.subscribeAuthResponse(this.httpService.post<IAuthResponse>(`${this.apiPrefix}/register`, user));
  }

  private subscribeAuthResponse(authResponse: Observable<IAuthResponse>): Observable<IAuthResponse> {
    return authResponse.pipe(
      map((response) => {
        this.tokenService.setTokens({
          accessToken: response.accessToken,
          refreshToken: response.refreshToken
        });
        this.user = response.user;
        this.eventService.changeUser(response.user);
        return response;
      })
    );
  }

  public logout(): Observable<any> {
    return this.tokenService.revokeRefreshToken().pipe(
      map((response) => {
        this.tokenService.removeTokens();
        this.user = null;
        this.eventService.changeUser(this.user);
        this.router.navigateByUrl('/auth/login');

        return response;
      })
    );
  }
}
