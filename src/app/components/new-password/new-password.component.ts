import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';

import { HeaderComponent } from '../../shared/header/header.component';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth/auth.service';

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

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private toastrService = inject(ToastrService);

  ngOnInit() {
    this.newPasswordForm = this.fb.group({
      senha: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/)
      ]),
      confirmarSenha: new FormControl('', [Validators.required])
    });
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
            this.route.snapshot.queryParams['token'],
            this.newPasswordForm.get('senha')?.value
          )
          .subscribe(() => {
            this.router.navigate(['/login']);
            this.toastrService.success('Senha alterada com sucesso');
          });
        this.newPasswordForm.reset();
        this.router.navigate(['/login']);
      } else {
        this.toastrService.error('Senha não confere');
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
