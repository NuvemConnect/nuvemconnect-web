import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  templateUrl: './list.component.html'
})
export class ListComponent {

  private authService = inject(AuthService);
  private router = inject(Router);

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
