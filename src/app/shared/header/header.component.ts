import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DynamicSidebarComponent } from '../dynamic-sidebar/dynamic-sidebar.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, DynamicSidebarComponent],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  getWindowInnerWidth() {
    return (window.innerWidth = 768);
  }
  imageUrl = `imgWeb.svg`;
  title = `NuvemConnect`;
  textContent = `NuvemConnect é uma solução que simplifica o gerenciamento de plataformas de armazenamento em nuvem amplamente utilizadas, como Google Drive, Mega e OneDrive.`;
}
