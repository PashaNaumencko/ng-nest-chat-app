import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faCommentDots, faUser, faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {

  faCommentDots = faCommentDots;
  faUser = faUser;
  faCheckCircle = faCheckCircle;
  faExclamationCircle = faExclamationCircle;

  unsubscribe$ = new Subject<void>();

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  loading = false;
  loginError = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onLogin(): void {
    if (this.loading) {
      return;
    }

    this.loading = true;
    this.authService.login(this.loginForm.value)
      .pipe(
        takeUntil(this.unsubscribe$),
        finalize(() => this.loading = false)
      )
      .subscribe(
        () => this.router.navigate(['/']),
        (error) => this.loginError = error.message
      );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
