import { Injectable } from '@angular/core';
import { HttpInternalService } from './http-internal.service';
import { TokenService } from './token.service';
import { UserDTO } from '../modules/auth/models/UserDTO';
import { IAuthResponse } from '../modules/auth/models/IAuthResponse';
import { CredentialsDTO } from '../modules/auth/models/CredentialsDTO';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';


@Injectable()
export class AuthService {
  public apiPrefix = 'auth';
  private user: UserDTO;

  constructor(
    private httpService: HttpInternalService,
    private tokenService: TokenService
  ) { }

  public login(credentials: CredentialsDTO): Observable<IAuthResponse> {
    return this.subscribeAuthResponse(this.httpService.post<IAuthResponse>(`${this.apiPrefix}/login`, credentials));
  }

  public register(user: UserDTO): Observable<IAuthResponse> {
    return this.subscribeAuthResponse(this.httpService.post<IAuthResponse>(`${this.apiPrefix}/register`, user));
  }

  private subscribeAuthResponse(response: Observable<HttpResponse<IAuthResponse>>) {
    return response.pipe(
      map((response) => {
        this.tokenService.setTokens({
          accessToken: response.body.accessToken,
          refreshToken: response.body.refreshToken
        });
        this.user = response.body.user;
        // this.eventService.userChanged(resp.body.user);
        return response.body;
      })
    );
  }
}
