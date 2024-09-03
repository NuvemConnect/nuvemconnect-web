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
import { DynamicSidebarComponent } from '../../shared/dynamic-sidebar/dynamic-sidebar.component';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-recovery',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    RouterModule,
    ReactiveFormsModule,
    DynamicSidebarComponent
  ],
  templateUrl: './recovery.component.html'
})
export class RecoveryComponent {
  imageUrl = `sapiens.svg`;
  title = `NuvemConnect`;
  textContent = `NuvemConnect é uma solução que simplifica o gerenciamento de plataformas de armazenamento em nuvem amplamente utilizadas, como Google Drive, Mega e OneDrive.`;

  form!: FormGroup;
  private router = inject(Router);
  private emailService = inject(EmailService);
  private fb = inject(FormBuilder);
  ngOnInit() {
    this.form = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }
  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      const url = this.router.serializeUrl(
        this.router.createUrlTree(['/confirm-email'], {
          queryParams: { email: this.form.value.email }
        })
      );
      this.router.navigate(['/verify']);
      window.open(url, '_blank');
    }
  }
}
