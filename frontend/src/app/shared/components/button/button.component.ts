import { Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() type = 'button';
  @Input() isPrimary: boolean;
  @Input() fullWidth: boolean;
  @Input() disabled: boolean;
  @Input() loading: boolean;
  @Input() icon: IconDefinition;
  @Input() text: string;
}
