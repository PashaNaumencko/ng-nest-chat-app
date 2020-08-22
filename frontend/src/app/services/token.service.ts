import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-localstorage';
import { HttpInternalService } from './http-internal.service';
import { TokensDTO } from '../modules/auth/models/TokensDTO';
import { IAuthResponse } from '../modules/auth/models/IAuthResponse';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  apiPrefix = 'auth/tokens';

  constructor(
    private storageService: LocalStorageService,
    private httpService: HttpInternalService
  ) { }

  public refreshTokens(): Observable<IAuthResponse> {
    return this.httpService.post<IAuthResponse>(`${this.apiPrefix}`, {
      refreshToken: this.getRefreshToken()
    })
      .pipe(
        map((response) => {
          this.setTokens({
            accessToken: response.accessToken,
            refreshToken: response.refreshToken
          });

          return response;
        })
      );
  }

  public revokeRefreshToken(): Observable<IAuthResponse>  {
    return this.httpService.post<IAuthResponse>(`${this.apiPrefix}/revoke`, {
      refreshToken: this.getRefreshToken()
     })
      .pipe(
        map((response) => {
          this.removeTokens();

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
    this.storageService.set('refreshToken', tokens.refreshToken);
  }
}
