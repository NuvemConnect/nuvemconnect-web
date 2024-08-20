import { HeaderComponent } from './../header/header.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { DynamicFormComponent } from '../../shared/dynamic-form/dynamic-form.component';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { DynamicSidebarComponent } from '../../shared/dynamic-sidebar/dynamic-sidebar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    RouterModule,
    ReactiveFormsModule,
    DynamicFormComponent,
    DynamicSidebarComponent,
    NgIf,
    NgFor
  ],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  formConfig = [{}];
}
