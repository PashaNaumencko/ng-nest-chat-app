import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl, FormGroup } from '@angular/forms';
import { faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputComponent),
    multi: true
  }]
})
export class InputComponent implements ControlValueAccessor {
  @Input() label: string;
  @Input() required: boolean;
  @Input() name: string;
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() formGroup: FormGroup;

  faCheckCircle = faCheckCircle;
  faExclamationCircle = faExclamationCircle;


  // The internal data model
  private innerValue: any = '';

  // Placeholders for the callbacks which are later provided
  // by the Control Value Accessor
  private onTouchedCallback: () => void;
  private onChangeCallback: (_: any) => void;

  // get formControl(): FormControl {
  //   return this.formControl[this.name];
  // }

  // get accessor
  get value(): any {
    return this.innerValue;
  }

  // set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
        this.innerValue = v;
        this.onChangeCallback(v);
    }
  }

  // Set touched on blur
  onBlur(): void {
    this.onTouchedCallback();
  }

  // From ControlValueAccessor interface
  writeValue(value: any): void {
    if (value !== this.innerValue) {
        this.innerValue = value;
    }
  }

  // From ControlValueAccessor interface
  registerOnChange(fn: any): void {
      this.onChangeCallback = fn;
  }

  // From ControlValueAccessor interface
  registerOnTouched(fn: any): void {
      this.onTouchedCallback = fn;
  }
}
