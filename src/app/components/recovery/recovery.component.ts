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
import { AuthService } from '../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { tap, catchError, of } from 'rxjs';

@Component({
  selector: 'app-recovery',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, RouterModule],
  providers: [ReactiveFormsModule],
  templateUrl: './recovery.component.html'
})
export class RecoveryComponent {
  recoveryForm!: FormGroup;

  private router = inject(Router);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private toastrService = inject(ToastrService);

  ngOnInit() {
    this.recoveryForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }
  onSubmit() {
    if (this.recoveryForm.valid) {
      this.authService
        .forgotPassword(this.recoveryForm.get('email')?.value)
        .pipe(
          tap(() => {
            this.router.navigate(['/login']);
            this.toastrService.success(
              `Um e-mail de redefição de senha foi enviado para 
              ${this.recoveryForm.get('email')?.value}.`
            );
          }),
          catchError((error) => {
            this.toastrService.error(error.error.message || 'Erro ao redefinir senha');
            return of(error);
          })
        )
        .subscribe();
    }
  }
}
