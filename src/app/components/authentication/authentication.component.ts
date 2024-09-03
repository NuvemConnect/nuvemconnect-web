import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './authentication.component.html'
})
export class AuthenticationComponent {
  title = 'NuvemConnect';
}
