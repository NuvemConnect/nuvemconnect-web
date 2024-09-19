import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, RouterModule, ReactiveFormsModule],
  providers: [AuthService],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  registerForm!: FormGroup;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  private router = inject(Router);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private toastrService = inject(ToastrService);

  ngOnInit() {
    this.registerForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
            )
          ]
        ],
        confirmPassword: ['', [Validators.required]]
      },
      { validators: this.senhaIgualConfirmacao }
    );
  }

  senhaIgualConfirmacao(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { senhasDiferentes: true };
    }
    return null;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { name, email, password, confirmPassword } = this.registerForm.value;
      this.authService.createAccount(name, email, password, confirmPassword).subscribe(
        (response) => {
          if (response.UUID) {
            this.toastrService.success('Conta criada com sucesso. Por favor, verifique seu email.');
            const url = this.router.serializeUrl(
              this.router.createUrlTree(['/confirm-email'], {
                queryParams: { email: email }
              })
            );
            window.open(url, '_blank');
            this.router.navigate(['/login']);
          } else {
            this.toastrService.error(response.message || 'Erro ao criar conta. Tente novamente.');
          }
        },
        (error) => {
          console.error(`Erro ao criar conta: ${error.message}`);
          this.toastrService.error('Erro ao criar conta. Tente novamente.');
        }
      );
    } else {
      this.toastrService.error('Por favor, corrija os erros no formulário.');
    }
  }

  toggleVisibilityConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
  toggleVisibilityPassword() {
    this.showPassword = !this.showPassword;
  }
}
