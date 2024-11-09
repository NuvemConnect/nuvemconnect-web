import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../interfaces/user';
import { jwtDecode } from 'jwt-decode';

import { GoogleApiService } from '../../services/google/google-api.service';
import { responseApi } from '../../interfaces/response-api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  providers: [AuthService],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  @ViewChild('googleBtn') googleBtn!: ElementRef;

  loginForm!: FormGroup;
  showPassword: boolean = false;

  title: string = 'NuvemConnect';

  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private toastrService = inject(ToastrService);
  private googleApiService = inject(GoogleApiService);

  ngOnInit() {
    this.initForm();
  }

  ngAfterViewInit(): void {
    this.initializeGoogleSignIn();
  }
  async initializeGoogleSignIn(): Promise<void> {
    try {
      const google = await this.googleApiService.getGoogle();
      google.accounts.id.initialize({
        client_id: '234107094075-17ib6vmjrcoovogdv04som9kof47g3ju.apps.googleusercontent.com',
        callback: this.handleCredentialResponse.bind(this)
      });
      google.accounts.id.renderButton(this.googleBtn.nativeElement, {
        theme: 'filled_white',
        size: 'large',
        shape: 'pill',
        width: 1000,
        text: 'Google'
      });
    } catch (error) {
      console.error('Error initializing Google Sign-In:', error);
    }
  }

  handleCredentialResponse(response: responseApi): void {
    console.log('handleCredentialResponse', jwtDecode(response.credential));
    const userDecoded = jwtDecode(response.credential);
    console.log(userDecoded);
    const user = userDecoded as User;
    this.authService.setUser(user);
    this.router.navigate(['/home']);
    this.toastrService.success('Login realizado com sucesso ');
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
            this.toastrService.error('Senha ou email inválidos', 'Erro', { closeButton: true });
          }
        },
        error: (error) => {
          console.error('Erro ao fazer Login:', error.error.message);
          this.toastrService.error(`Erro ao fazer Login. Tente novamente.`, 'Erro', {
            closeButton: true
          });
        }
      });
    } else {
      this.toastrService.error('Por favor, corrija os erros no formulário.', 'Erro', {
        closeButton: true
      });
    }
  }

  iniciarGoogleLogin() {
    try {
      this.authService.iniciarGoogleLogin().subscribe((response) => {
        console.log(response);
      });
      console.log('login component');
    } catch (error) {
      console.log(error);
    }
  }

  onSubmit() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      this.login();
    } else {
      this.toastrService.error('Por favor, corrija os erros no formulário.', 'Erro', {
        closeButton: true
      });
    }
  }

  toggleVisibilityPassword() {
    this.showPassword = !this.showPassword;
  }
}
