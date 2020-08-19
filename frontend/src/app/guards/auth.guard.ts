import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { CanActivate, CanActivateChild } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private tokenService: TokenService,
    private router: Router
  ) {}

  public canActivate(): boolean {
    return this.checkIsAuthorized();
  }

  public canActivateChild(): boolean {
    return this.checkIsAuthorized();
  }

  private checkIsAuthorized(): boolean {
    if (this.tokenService.checkTokens()) {
      return true;
    }

    this.router.navigate(['/auth/login']);

    return false;
  }
}
