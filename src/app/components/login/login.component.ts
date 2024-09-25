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
          width: 384
        });
      }
    } catch (error) {
      console.error('Error initializing Google Sign-In:', error);
    }
  }

  handleCredentialResponse(response: responseApi): void {
    const token = response.credential;
    const name = this.googleApiService.jwtDecode(token).given_name;
    const email = this.googleApiService.jwtDecode(token).email;

    this.authService.setToken(token);
    this.authService.setName(name);
    this.authService.setEmail(email);
    this.router.navigate(['/home']);
    this.toastrService.success('Login realizado com sucesso ');
  }

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        (response) => {
          if (response.token) {
            this.authService.setToken(response.token);
            this.authService.setEmail(this.googleApiService.jwtDecode(response.token).email);
            this.authService.setName(this.googleApiService.jwtDecode(response.token).name);
            this.router.navigate(['/home']);
            this.toastrService.success('Login realizado com sucesso ');
          } else {
            console.log(response.token);
            this.toastrService.error('Credenciais inválidas');
          }
        },
        (error) => {
          console.log(`Erro ao fazer Login: ${error.message}`);
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
