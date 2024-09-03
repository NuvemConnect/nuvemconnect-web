import { Component } from '@angular/core';
import { DynamicSidebarComponent } from '../../shared/dynamic-sidebar/dynamic-sidebar.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-confirm-email',
  standalone: true,
  imports: [DynamicSidebarComponent, RouterOutlet, HeaderComponent, RouterModule],
  templateUrl: './confirm-email.component.html'
})
export class ConfirmEmailComponent {
  imageUrl = `sapiens.svg`;
  title = `NuvemConnect`;
  textContent = `NuvemConnect é uma solução que simplifica o gerenciamento de plataformas de armazenamento em nuvem amplamente utilizadas, como Google Drive, Mega e OneDrive.`;
}
