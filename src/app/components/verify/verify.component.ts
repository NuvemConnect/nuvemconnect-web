import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { DynamicSidebarComponent } from '../../shared/dynamic-sidebar/dynamic-sidebar.component';

@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    RouterModule,
    ReactiveFormsModule,
    DynamicSidebarComponent
  ],
  templateUrl: './verify.component.html'
})
export class VerifyComponent {
  codeForm!: FormGroup;
  imageUrl = `sapiens.svg`;
  title = `NuvemConnect`;
  textContent = `NuvemConnect é uma solução que simplifica o gerenciamento de plataformas de armazenamento em nuvem amplamente utilizadas, como Google Drive, Mega e OneDrive.`;

  constructor(private fb: FormBuilder) {
    this.codeForm = this.fb.group({
      code1: [''],
      code2: [''],
      code3: [''],
      code4: ['']
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
    const pasteData = event.clipboardData?.getData('text').slice(0, 4) || '';
    this.codeForm.patchValue({
      code1: pasteData[0] || '',
      code2: pasteData[1] || '',
      code3: pasteData[2] || '',
      code4: pasteData[3] || ''
    });

    const lastFilledIndex = pasteData.length - 1;
    const lastInputId = `code${lastFilledIndex + 1}`;
    const lastInput = document.getElementById(lastInputId) as HTMLInputElement;
    lastInput?.focus();
  }

  onSubmit(): void {
    const code = Object.values(this.codeForm.value).join('');
    console.log('Código de verificação:', code);
    // colocar a logica aqui
  }
}
