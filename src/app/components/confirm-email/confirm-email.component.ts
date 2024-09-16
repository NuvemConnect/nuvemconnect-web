import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-confirm-email',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, RouterModule],
  templateUrl: './confirm-email.component.html'
})
export class ConfirmEmailComponent {
  private toastrService = inject(ToastrService);

  ngOnInit() {
    this.toastrService.info('Verifique seu e-mail e clique no link de confirmação.');
  }
}
