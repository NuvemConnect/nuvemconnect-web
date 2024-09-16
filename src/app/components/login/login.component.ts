import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from '../../shared/header/header.component';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    ReactiveFormsModule,
    NgIf,
    NgFor,
    HeaderComponent
  ],
  providers: [AuthService],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginForm!: FormGroup;
  showPassword: boolean = false;

  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private http = inject(HttpClient);
  private toastrService = inject(ToastrService);

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/)
      ])
    });
  }

  login(authToken: string) {
    // Call the login service method with the login form values
    this.authService.login(this.loginForm.value);
    // Set the auth token to the local storage
    this.authService.setToken(authToken);
    // Navigate to the home page
    this.router.navigate(['/home']);
    // Show success message
    this.toastrService.success('Login realizado com sucesso');
  }

  onSubmit(authToken: string) {
    if (this.loginForm.valid) {
      this.login(authToken);
      console.log(authToken);
    } else {
      this.toastrService.error('Formulário inválido');
    }
  }

  toggleVisibilityPassword() {
    this.showPassword = !this.showPassword;
  }
}
