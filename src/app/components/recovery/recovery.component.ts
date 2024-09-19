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
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recovery',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, RouterModule, ReactiveFormsModule],
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
      const email = this.recoveryForm.get('email')?.value;

      this.authService.requestPasswordRecovery(email).subscribe(
        (response) => {
          if (response.token) {
            this.toastrService.success(
              'Um e-mail de recuperação foi enviado. Por favor, verifique seu email.'
            );
            const url = this.router.serializeUrl(
              this.router.createUrlTree(['/confirm-email'], {
                queryParams: { email: email }
              })
            );
            window.open(url, '_blank');
            this.router.navigate(['/verify']);
          } else {
            this.toastrService.error(
              response.message || 'Falha ao enviar e-mail de recuperação. Tente novamente.'
            );
          }
        },
        (error) => {
          console.error(`Erro ao solicitar recuperação de senha: ${error.message}`);
          this.toastrService.error('Erro ao solicitar recuperação de senha. Tente novamente.');
        }
      );
    } else {
      this.toastrService.error('Por favor, forneça um endereço de e-mail válido.');
    }
  }
}
