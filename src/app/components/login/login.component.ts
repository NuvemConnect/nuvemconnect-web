import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { HeaderComponent } from '../../shared/header/header.component';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../interfaces/user';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    HeaderComponent,
    NgFor,
    NgIf,
    ReactiveFormsModule
  ],
  providers: [AuthService],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showPassword: boolean = false;

  title: string = 'NuvemConnect';

  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private toastrService = inject(ToastrService);

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (response) => {
          if (response.token) {
            const userDecoded: User = jwtDecode(response.token);
            this.authService.setUser(userDecoded);
            this.router.navigate(['/home']);
            this.toastrService.success('Login realizado com sucesso', 'Sucesso', {
              closeButton: true
            });
          } else {
            this.toastrService.error('Credenciais inválidas', 'Erro', { closeButton: true });
          }
        },
        error: (error) => {
          console.error('Erro ao fazer Login:', error.error.message);
          this.toastrService.error(
            `Erro ao fazer Login. Tente novamente. ${error.error?.message || ''}`,
            'Erro',
            { closeButton: true }
          );
        }
      });
    } else {
      this.toastrService.error('Formulário inválido', 'Erro', { closeButton: true });
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.login();
    } else {
      this.toastrService.error('Formulário inválido', 'Erro', { closeButton: true });
    }
  }

  toggleVisibilityPassword() {
    this.showPassword = !this.showPassword;
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle().subscribe({
      next: (response) => {
        console.log(response);
        this.toastrService.success('Login com google', 'Sucesso', { closeButton: true });
      },
      error: (error) => {
        console.log(error);
        this.toastrService.error('Erro ao fazer login com google', 'Erro', { closeButton: true });
      }
    })
  }
}
