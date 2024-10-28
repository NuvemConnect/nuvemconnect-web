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
import { AuthService } from '../../services/auth/auth.service';
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
    this.registerForm = this.fb.group({
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
      passwordConfirmation: ['', [Validators.required]]
    });
  }

  senhaIgualConfirmacao(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const passwordConfirmation = control.get('passwordConfirmation');
    if (password && passwordConfirmation && password.value !== passwordConfirmation.value) {
      return { senhasDiferentes: true };
    }
    return null;
  }

  onSubmit() {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.valid) {
      const { name, isActive, email, password, passwordConfirmation } = this.registerForm.value;
      this.authService
        .createAccount(name, isActive, email, password, passwordConfirmation)
        .subscribe(
          (response) => {
            if (response) {
              console.log(response.message);
              this.toastrService.success(
                'Conta criada com sucesso. Por favor, verifique seu email.',
                'Sucesso',
                { closeButton: true }
              );
              this.router.navigate(['/confirm-email'], {
                queryParams: { email: email }
              });
            } else {
              this.toastrService.error(
                response || 'Erro ao criar conta. Tente novamente.',
                'Erro',
                { closeButton: true }
              );
            }
          },
          (error) => {
            console.error(`Erro ao criar conta: ${error.message}`);
            this.toastrService.error('Erro ao criar conta. Tente novamente.', 'Erro', {
              closeButton: true
            });
          }
        );
    } else {
      this.toastrService.error('Por favor, corrija os erros no formulário.', 'Erro', {
        closeButton: true
      });
    }
  }

  toggleVisibilityConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
  toggleVisibilityPassword() {
    this.showPassword = !this.showPassword;
  }
}
