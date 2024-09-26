import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html'
})
export class ListComponent {
  user!: User | null;

  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    if (this.user !== null) {
      this.user = this.authService.getUser();
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
