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
import { loadGapiInsideDOM, gapi, loadClientAuth2 } from 'gapi-script';
import { HttpClient } from '@angular/common/http';

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
  form!: FormGroup;
  showPassword: boolean = false;

  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private http = inject(HttpClient);

  ngOnInit() {
    this.initializeGoogleSignIn();
    this.form = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  async initializeGoogleSignIn() {
    await loadGapiInsideDOM();
    await loadClientAuth2(
      gapi,
      '615624047539-etnq4l44h7sc6tps64oq1prsapvc3evi.apps.googleusercontent.com',
      'profile email'
    );
  }

  loginWithGoogle() {
    this.authService.signInWithGoogle();
    console.log(this.authService.signInWithGoogle());
  }
  login() {
    if (this.form.valid) {
      this.authService.login(this.form.value);
      console.log(this.form.value);
      this.router.navigate(['home']);
    }
    return false;
  }

  onSubmit() {
    if (this.form.valid) {
      this.login();
    }
  }

  toggleVisibilityPassword() {
    this.showPassword = !this.showPassword;
  }
}
