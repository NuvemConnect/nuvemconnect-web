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
import { VerifyService } from '../../services/verify/verify.service';

@Component({
  selector: 'app-recovery',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, RouterModule, ReactiveFormsModule],
  providers: [],
  templateUrl: './recovery.component.html'
})
export class RecoveryComponent {
  recoveryForm!: FormGroup;
  token: string | null = null;
  tokenUUID: string | null = null;
  email: string | null = null;

  private router = inject(Router);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private toastrService = inject(ToastrService);
  private verifyService = inject(VerifyService);

  ngOnInit() {
    this.recoveryForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }
  onSubmit() {
    this.email = this.recoveryForm.get('email')?.value;

    if (this.recoveryForm.valid) {
      this.authService
        .forgotPassword(this.email!)
        .pipe(
          tap((response) => {
            if (!response) {
              this.toastrService.error('Erro ao solicitar o código. ');
            };
            this.verifyService.setTokens(response.token, response.tokenUUID, this.email!);
            this.router.navigate([`/verify`]);
            this.toastrService.success(
              `Um e-mail de redefição de senha foi enviado para ${this.email!}.`
            );
          }),
          catchError((error) => {
            this.toastrService.error(
              `Erro ao redefinir senha: ${error.error.message}, ${this.email!}`
            );
            return of(error.error.message);
          })
        )
        .subscribe();
    }
  }
}
