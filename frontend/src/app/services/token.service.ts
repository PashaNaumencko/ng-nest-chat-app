import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-localstorage';
import { EventService } from './event.service';
import { HttpInternalService } from './http-internal.service';
import { TokensDTO } from '../modules/auth/models/TokensDTO';
import { IAuthResponse } from '../modules/auth/models/IAuthResponse';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RefreshTokenDTO } from '../modules/auth/models/RefreshTokenDTO';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  apiPrefix = 'tokens';

  constructor(
    private storageService: LocalStorageService,
    private httpService: HttpInternalService,
    private eventService: EventService
  ) { }

  public refreshTokens(refreshToken: RefreshTokenDTO): Observable<IAuthResponse> {
    return this.httpService.post<IAuthResponse>(`${this.apiPrefix}/tokens`, refreshToken)
      .pipe(
        map((response) => {
          this.setTokens({
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
          });

          return response;
        })
      );
  }

  public revokeRefreshToken(refreshToken: string): Observable<IAuthResponse>  {
    return this.httpService.post<IAuthResponse>(`${this.apiPrefix}/tokens/revoke`, { refreshToken })
      .pipe(
        map((response) => {
          this.removeTokens();
          this.eventService.changeUser(null);
          return response;
        })
      );
  }

  public checkTokens(): boolean {
    return this.storageService.get('accessToken') && this.storageService.get('refreshToken');
  }

  public removeTokens(): void {
    this.storageService.remove('accessToken');
    this.storageService.remove('refreshToken');
  }

  public getAccessToken(): string {
    return this.storageService.get('accessToken');
  }

  public getRefreshToken(): string {
    return this.storageService.get('refreshToken');
  }

  public setTokens(tokens: TokensDTO): void {
    this.storageService.set('accessToken', tokens.accessToken);
    this.storageService.set('refreshToken', tokens.accessToken);
  }
}
