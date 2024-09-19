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

  login() {
    if (this.loginForm.valid) {
      const { email, senha } = this.loginForm.value;
      this.authService.login(email, senha).subscribe(
        (response) => {
          if (response.success) {
            this.authService.setToken(response.token);
            this.router.navigate(['/home']);
            this.toastrService.success('Login realizado com sucesso');
          } else {
            this.toastrService.error('Credenciais inválidas');
          }
        },
        (error) => {
          console.error(`Erro ao fazer Login: ${error}`);
          this.toastrService.error('Erro ao fazer Login. Tente novamente.');
        }
      );
    } else {
      this.toastrService.error('Formulário inválido');
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.login();
    } else {
      this.toastrService.error('Formulário inválido');
    }
  }

  toggleVisibilityPassword() {
    this.showPassword = !this.showPassword;
  }
}
