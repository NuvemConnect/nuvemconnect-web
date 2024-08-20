import { ValidatorFn } from '@angular/forms';

export interface FormFieldBase {
  name: string;
  label: string;
  validations?: ValidatorFn[];
  errorMessage?: string;
}

export interface TextFieldConfig extends FormFieldBase {
  type: 'text' | 'email' | 'number';
  value?: string | number;
}

export interface SelectFieldConfig extends FormFieldBase {
  type: 'select';
  options: { label: string; value: string | number }[];
}

export interface ButtonConfig {
  submitButtonText: string;
}

export type FormFieldConfig = TextFieldConfig | SelectFieldConfig | ButtonConfig;
