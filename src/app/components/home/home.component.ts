import { Component } from '@angular/core';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  user!: User;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');

    console.log(this.user);
  }
}
