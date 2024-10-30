import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './list.component.html'
})
export class ListComponent {
  user!: User | null;

  private authService = inject(AuthService);
  private router = inject(Router);
  private toastrService = inject(ToastrService);

  ngOnInit(): void {
    if (this.user !== null) {
      this.user = this.authService.getUser();
    }
  }

  logout() {
    this.authService.logout();
    this.user = null;
    this.authService.removeToken();
    this.router.navigate(['/login']);
    this.toastrService.warning('Logout efetuado com sucesso.', 'Logout', { closeButton: true });
  }
}
