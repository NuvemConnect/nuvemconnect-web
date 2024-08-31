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
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    RouterModule,
    ReactiveFormsModule,
    DynamicSidebarComponent
  ],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  imageUrl = `sapiens.svg`;
  title = `NuvemConnect`;
  textContent = `NuvemConnect é uma solução que simplifica o gerenciamento de plataformas de armazenamento em nuvem amplamente utilizadas, como Google Drive, Mega e OneDrive.`;
  form!: FormGroup;

  private router = inject(Router);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);

  ngOnInit() {
    this.form = this.fb.group({
      nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
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
      }
      console.log('senha não confere');
    }
  }
}
