import { NgFor, NgForOf, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { FormFieldConfig, SelectFieldConfig, TextFieldConfig } from '../../interfaces/form';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor, NgForOf],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.css'
})
export class DynamicFormComponent {
  @Input() config: FormFieldConfig[] = [];
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
    this.config.forEach((field) => {
      if (this.isTextField(field)) {
        const control = this.fb.control(
          field.value || '',
          this.bindValidations(field.validations || [])
        );
        this.form.addControl(field.name, control);
      } else if (this.isSelectField(field)) {
        const control = this.fb.control('', this.bindValidations(field.validations || []));
        this.form.addControl(field.name, control);
      }
      // ButtonConfig não precisa de form control, então não faz nada aqui.
    });
  }

  bindValidations(validations: ValidatorFn[] | undefined) {
    if (validations && validations.length > 0) {
      return Validators.compose(validations);
    }
    return null;
  }

  isTextField(field: FormFieldConfig): field is TextFieldConfig {
    return (
      'type' in field &&
      (field.type === 'text' || field.type === 'email' || field.type === 'number')
    );
  }

  isSelectField(field: FormFieldConfig): field is SelectFieldConfig {
    return 'type' in field && field.type === 'select';
  }

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
