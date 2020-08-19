import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { CanActivate, CanActivateChild } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate, CanActivateChild {
  constructor(
    private tokenService: TokenService,
    private router: Router
  ) {}

  public canActivate(): boolean {
    return this.checkIsLoggedIn();
  }

  public canActivateChild(): boolean {
    return this.checkIsLoggedIn();
  }

  private checkIsLoggedIn(): boolean {
    if (!this.tokenService.checkTokens()) {
      return true;
    }

    this.router.navigate(['/']);

    return false;
  }
}
