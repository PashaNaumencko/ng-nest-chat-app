import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-localstorage';
import { HttpInternalService } from './http-internal.service';
import { TokensDTO } from '../modules/auth/models/TokensDTO';
import { IAuthResponse } from '../modules/auth/models/IAuthResponse';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { IRefreshToken } from '../modules/auth/models/IRefreshToken';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  apiPrefix = 'tokens';

  constructor(
    private storageService: LocalStorageService,
    private httpService: HttpInternalService
  ) { }

  public refreshTokens(tokens: TokensDTO): Observable<TokensDTO> {
    return this.httpService.post<TokensDTO>(`${this.apiPrefix}/tokens`, tokens)
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

  public revokeRefreshToken(refreshToken: string): Observable<IRefreshToken> {
    return this.httpService.post<IAuthResponse>(`${this.apiPrefix}/tokens/revoke`, { refreshToken });
  }

  public checkTokens(): boolean {
    return this.storageService.get('accessToken') && this.storageService.get('refreshToken');
  }

  public removeTokens(): void {
    this.storageService.remove('accessToken');
    this.storageService.remove('refreshToken');
  }

  public setTokens(tokens: TokensDTO): void {
    this.storageService.set('accessToken', tokens.accessToken);
    this.storageService.set('refreshToken', tokens.accessToken);
  }
}
