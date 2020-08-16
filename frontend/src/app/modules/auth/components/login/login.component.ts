import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faCommentDots, faUser, faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  faCommentDots = faCommentDots;
  faUser = faUser;
  faCheckCircle = faCheckCircle;
  faExclamationCircle = faExclamationCircle;

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private authService: AuthService,
    private router: Router,

  ) { }

  ngOnInit(): void {

  }

  onLogin(): void {
    console.log(this.loginForm.valid);
    console.log(this.loginForm.value);
  }
}
