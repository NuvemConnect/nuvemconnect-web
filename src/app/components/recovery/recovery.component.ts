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

@Component({
  selector: 'app-recovery',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, RouterModule, ReactiveFormsModule],
  templateUrl: './recovery.component.html'
})
export class RecoveryComponent {
  form!: FormGroup;
  private router = inject(Router);
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
