import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';

import { DynamicSidebarComponent } from '../../shared/dynamic-sidebar/dynamic-sidebar.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    ReactiveFormsModule,
    HeaderComponent,
    DynamicSidebarComponent
  ],
  templateUrl: './new-password.component.html'
})
export class NewPasswordComponent {
  imageUrl = `sapiens.svg`;
  title = `NuvemConnect`;
  textContent = `NuvemConnect é uma solução que simplifica o gerenciamento de plataformas de armazenamento em nuvem amplamente utilizadas, como Google Drive, Mega e OneDrive.`;
  form!: FormGroup;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private emailService = inject(EmailService);

  ngOnInit() {
    this.form = this.fb.group({
      senha: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmarSenha: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  senhaIgualConfirmacao() {
    const senha = this.form.get('senha')?.value;
    const confirmarSenha = this.form.get('confirmarSenha')?.value;
    return senha === confirmarSenha;
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.senhaIgualConfirmacao()) {
        console.log(this.form.value);
        this.router.navigate(['/login']);
      } else {
        console.log('senha não confere');
      }
    }
  }
}
