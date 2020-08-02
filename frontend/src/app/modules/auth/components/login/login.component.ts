import { Component, OnInit } from '@angular/core';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  faCommentDots = faCommentDots;

  constructor() { }

  ngOnInit(): void {
  }

}
