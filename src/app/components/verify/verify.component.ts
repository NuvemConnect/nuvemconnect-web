import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { VerifyService } from '../../services/verify/verify.service';

@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, RouterModule, ReactiveFormsModule],
  providers: [],
  templateUrl: './verify.component.html'
})
export class VerifyComponent {
  codeForm!: FormGroup;
  imageUrl = 'sapiens.svg';
  title = 'NuvemConnect';
  textContent =
    'NuvemConnect é uma solução que simplifica o gerenciamento de plataformas de armazenamento em nuvem amplamente utilizadas, como Google Drive, Mega e OneDrive.';

  private token: string | null = null;
  private tokenUUID: string | null = null;
  private email: string | null = null;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private toastrService = inject(ToastrService);
  private verifyService = inject(VerifyService);

  ngOnInit() {
    this.codeForm = this.fb.group({
      code1: ['', [Validators.required, Validators.pattern('[A-Za-z0-9]')]],
      code2: ['', [Validators.required, Validators.pattern('[A-Za-z0-9]')]],
      code3: ['', [Validators.required, Validators.pattern('[A-Za-z0-9]')]],
      code4: ['', [Validators.required, Validators.pattern('[A-Za-z0-9]')]],
      code5: ['', [Validators.required, Validators.pattern('[A-Za-z0-9]')]],
      code6: ['', [Validators.required, Validators.pattern('[A-Za-z0-9]')]]
    });
    this.verifyService.token$.subscribe((token) => (this.token = token));
    this.verifyService.tokenUUID$.subscribe((tokenUUID) => (this.tokenUUID = tokenUUID));
    this.verifyService.email$.subscribe((email) => (this.email = email));
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
    const code: string | null = Object.values(this.codeForm.value).join('');

    if (code === this.token && this.token !== null) {
      this.toastrService.success('Código validado com sucesso', 'Sucesso', { closeButton: true });
      this.router.navigate(['/new-password']);
    } else {
      this.toastrService.error('Código inválido', 'Erro', { closeButton: true });
    }
  }
}
