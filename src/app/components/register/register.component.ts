import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, RouterModule, ReactiveFormsModule],
  providers: [AuthService],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  imageUrl = `sapiens.svg`;
  title = `NuvemConnect`;
  textContent = `NuvemConnect é uma solução que simplifica o gerenciamento de plataformas de armazenamento em nuvem amplamente utilizadas, como Google Drive, Mega e OneDrive.`;
  registerForm!: FormGroup;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  private router = inject(Router);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);

  ngOnInit() {
    this.registerForm = this.fb.group({
      nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmarSenha: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  senhaIgualConfirmacao() {
    const senha = this.registerForm.get('senha')?.value;
    const confirmarSenha = this.registerForm.get('confirmarSenha')?.value;
    return senha === confirmarSenha;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const url = this.router.serializeUrl(
        this.router.createUrlTree(['/confirm-email'], {
          queryParams: { email: this.registerForm.value.email }
        })
      );
      if (this.senhaIgualConfirmacao()) {
        this.authService.createAccount(this.registerForm.value);
        this.router.navigate(['/login']);
        window.open(url, '_blank');
      } else {
        console.log('senha não confere');
      }
    }
  }

  toggleVisibilityConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
  toggleVisibilityPassword() {
    this.showPassword = !this.showPassword;
  }
}
