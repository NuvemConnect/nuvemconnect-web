import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  templateUrl: './list.component.html'
})
export class ListComponent {
  imgProfile: string | null =
    'https://www.forestcom.com.br/wp-content/uploads/2018/09/blank-profile-picture-973460_640.png';
  nome: string | null = null;
  email: string | null = null;
  token: string | null = null;

  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    this.imgProfile = this.authService.getImgProfile();
    this.nome = this.authService.getNome();
    this.email = this.authService.getEmail();
    this.token = this.authService.getToken();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
