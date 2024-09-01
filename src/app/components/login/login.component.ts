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
import { DynamicSidebarComponent } from '../../shared/dynamic-sidebar/dynamic-sidebar.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { inject } from '@angular/core';
import { User } from '../../interfaces/user';

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
    HeaderComponent,
    DynamicSidebarComponent
  ],
  providers: [AuthService],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  form!: FormGroup;
  imageUrl = `logotipo.svg`;
  title = `NuvemConnect`;
  textContent = `NuvemConnect é uma solução que simplifica o gerenciamento de plataformas de armazenamento em nuvem amplamente utilizadas, como Google Drive, Mega e OneDrive.`;

  // private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  ngOnInit() {
    this.form = this.fb.group({
      email: new FormControl('', [Validators.required]),
      senha: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  login() {
    if (this.form.valid) {
      const data: User = this.form.value;
      if (data.email == "lauro@outlook.com.br" && data.senha == "11111111") {
        this.router.navigate(['/home'])
        return true
      }
      // this.authService.login(data).subscribe((response) => {
      //   console.log(response);
      // });
    }
      return false
  }

  onSubmit() {
    if (this.form.valid) {
      this.login();
    }
  }
}
