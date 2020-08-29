import { Component, Input } from '@angular/core';
import { faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent{
  faCheckCircle = faCheckCircle;
  faExclamationCircle = faExclamationCircle;

  @Input() alertText: string;
  @Input() success: boolean;
  @Input() error: boolean;
}
