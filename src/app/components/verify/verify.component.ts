import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { inject } from '@angular/core';

@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, RouterModule],
  providers: [ReactiveFormsModule],
  templateUrl: './verify.component.html'
})
export class VerifyComponent {
  codeForm!: FormGroup;
  imageUrl = 'sapiens.svg';
  title = 'NuvemConnect';
  textContent =
    'NuvemConnect é uma solução que simplifica o gerenciamento de plataformas de armazenamento em nuvem amplamente utilizadas, como Google Drive, Mega e OneDrive.';

  private fb = inject(FormBuilder);
  private router = inject(Router);

  ngOnInit() {
    this.codeForm = this.fb.group({
      code1: ['', [Validators.required, Validators.pattern('[0-9]')]],
      code2: ['', [Validators.required, Validators.pattern('[0-9]')]],
      code3: ['', [Validators.required, Validators.pattern('[0-9]')]],
      code4: ['', [Validators.required, Validators.pattern('[0-9]')]],
      code5: ['', [Validators.required, Validators.pattern('[0-9]')]],
      code6: ['', [Validators.required, Validators.pattern('[0-9]')]]
    });
  }

  onInputChange(event: Event, nextInputId: string): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (value && nextInputId) {
      const nextInput = document.getElementById(nextInputId) as HTMLInputElement;
      nextInput?.focus();
    }
  }

  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pasteData = event.clipboardData?.getData('text').slice(0, 6) || '';
    this.codeForm.patchValue({
      code1: pasteData[0] || '',
      code2: pasteData[1] || '',
      code3: pasteData[2] || '',
      code4: pasteData[3] || '',
      code5: pasteData[4] || '',
      code6: pasteData[5] || ''
    });

    const lastFilledIndex = pasteData.length - 1;
    const lastInputId = `code${lastFilledIndex + 1}`;
    const lastInput = document.getElementById(lastInputId) as HTMLInputElement;
    lastInput?.focus();
  }

  onSubmit(): void {
    const code = Object.values(this.codeForm.value).join('');
    console.log('Código de verificação:', code);
    this.router.navigate(['/new-password']);
  }
}
