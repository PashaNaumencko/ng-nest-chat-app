import { Component, OnInit } from '@angular/core';
import { faCommentDots, faUser, faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  faCommentDots = faCommentDots;
  faUser = faUser;
  faCheckCircle = faCheckCircle;
  faExclamationCircle = faExclamationCircle;

  constructor() { }

  ngOnInit(): void {
  }

}
