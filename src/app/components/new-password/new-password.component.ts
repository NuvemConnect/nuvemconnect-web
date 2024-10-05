import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

import { HeaderComponent } from '../../shared/header/header.component';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth/auth.service';
import { VerifyService } from '../../services/verify/verify.service';

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [RouterOutlet, RouterModule, HeaderComponent, ReactiveFormsModule],
  providers: [],
  templateUrl: './new-password.component.html'
})
export class NewPasswordComponent {
  newPasswordForm!: FormGroup;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  token: string | null = null;
  tokenUUID: string | null = null;
  email: string | null = null;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private toastrService = inject(ToastrService);
  private verifyService = inject(VerifyService);

  ngOnInit() {
    this.newPasswordForm = this.fb.group({
      senha: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/)
      ]),
      confirmarSenha: new FormControl('', [Validators.required])
    });
    this.verifyService.token$.subscribe((token) => (this.token = token));
    this.verifyService.tokenUUID$.subscribe((tokenUUID) => (this.tokenUUID = tokenUUID));
    this.verifyService.email$.subscribe((email) => (this.email = email));
  }

  senhaIgualConfirmacao() {
    const senha = this.newPasswordForm.get('senha')?.value;
    const confirmarSenha = this.newPasswordForm.get('confirmarSenha')?.value;
    return senha === confirmarSenha;
  }

  onSubmit() {
    if (this.newPasswordForm.valid) {
      if (this.senhaIgualConfirmacao()) {
        this.authService
          .resetPassword(
            this.token!,
            this.tokenUUID!,
            this.email!,
            this.newPasswordForm.get('senha')?.value,
            this.newPasswordForm.get('confirmarSenha')?.value
          )
          .subscribe(() => {
            this.router.navigate(['/login']);
            this.toastrService.success('Senha alterada com sucesso');
          });
        this.newPasswordForm.reset();
        this.router.navigate(['/login']);
      } else {
        this.toastrService.error('Senha não confere', 'Erro', { closeButton: true });
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
