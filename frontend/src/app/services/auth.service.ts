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

@Injectable()
export class AuthService {
  public apiPrefix = 'auth';
  private user: UserDTO;

  constructor(
    private httpService: HttpInternalService,
    private tokenService: TokenService,
    private eventService: EventService,
    private userService: UserService
  ) { }

  public getUser() {
    return this.user
      ? of(this.user)
      : this.userService.getUserFromToken().pipe(
        map((response) => {
          this.setUser(response);
          return response;
        })
      );
  }

  public setUser(user: UserDTO) {
    this.user = user;
    this.eventService.changeUser(this.user);
  }

  public login(credentials: CredentialsDTO): Observable<IAuthResponse> {
    return this.subscribeAuthResponse(this.httpService.post<IAuthResponse>(`${this.apiPrefix}/login`, credentials));
  }

  public register(user: UserDTO): Observable<IAuthResponse> {
    return this.subscribeAuthResponse(this.httpService.post<IAuthResponse>(`${this.apiPrefix}/register`, user));
  }

  private subscribeAuthResponse(response: Observable<IAuthResponse>) {
    return response.pipe(
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
}
