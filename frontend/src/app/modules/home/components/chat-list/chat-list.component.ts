import { Component, OnInit, OnDestroy } from '@angular/core';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { UserDTO } from 'src/app/modules/auth/models/UserDTO';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit, OnDestroy {
  faSignOutAlt = faSignOutAlt;

  authorizedUser: UserDTO;

  unsubscribe$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAuthorizedUser();
  }

  private getAuthorizedUser(): void {
    this.authService
      .getUser()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((user) => this.authorizedUser = user);
  }

  onLogout(): void {
    this.authService.logout()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        () => {
          this.authorizedUser = null;
          this.router.navigateByUrl('/auth/login');
        },
        (error) => console.error(error)
      );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getUser(): string {
    return JSON.stringify(this.authorizedUser);
  }
}
