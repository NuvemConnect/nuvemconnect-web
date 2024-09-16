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

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [RouterOutlet, RouterModule, ReactiveFormsModule, HeaderComponent],
  templateUrl: './new-password.component.html'
})
export class NewPasswordComponent {
  form!: FormGroup;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private toastrService = inject(ToastrService);

  ngOnInit() {
    this.form = this.fb.group({
      senha: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/)
      ]),
      confirmarSenha: new FormControl('', [Validators.required])
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
