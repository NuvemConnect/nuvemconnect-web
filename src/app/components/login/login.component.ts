import { CommonModule, NgFor, NgIf } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { GoogleApiService } from '../../services/google/google-api.service';
import { responseApi } from '../../interfaces/response-api';
import { User } from '../../interfaces/user';

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
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('googleBtn') googleBtn!: ElementRef;
  loginForm!: FormGroup;
  showPassword: boolean = false;

  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private toastrService = inject(ToastrService);
  private googleApiService = inject(GoogleApiService);

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/)
      ])
    });
  }

  async ngAfterViewInit() {
    await this.initializeGoogleSignIn();
  }

  async initializeGoogleSignIn() {
    try {
      const google = await this.googleApiService.getGoogle();
      if (google !== null) {
        google!.accounts.id.initialize({
          client_id: '234107094075-17ib6vmjrcoovogdv04som9kof47g3ju.apps.googleusercontent.com',
          callback: this.handleCredentialResponse.bind(this)
        });
        google!.accounts.id.renderButton(this.googleBtn.nativeElement, {
          theme: 'filled_white',
          size: 'large',
          shape: 'pill',
          text: 'signin_with',
          logo_alignment: 'left',
          width: 1000
        });
      }
    } catch (error) {
      console.error('Error initializing Google Sign-In:', error);
    }
  }

  handleCredentialResponse(response: responseApi): void {
    const token: string = response.credential;
    const { given_name: name, email } = this.googleApiService.jwtDecode(token);

    this.authService.setUser({ token, name, email });
    this.router.navigate(['/home']);
    this.toastrService.success('Login realizado com sucesso ');
  }

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (response) => {
          if (response.token) {
            const userDecoded: User = this.googleApiService.jwtDecode(response.token);
            this.authService.setUser(userDecoded);
            this.router.navigate(['/home']);
            this.toastrService.success('Login realizado com sucesso');
          } else {
            this.toastrService.error('Credenciais inválidas');
          }
        },
        error: (error) => {
          console.error('Erro ao fazer Login:', error);
          this.toastrService.error(
            `Erro ao fazer Login. Tente novamente. ${error.error?.message || ''}`
          );
        }
      });
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
