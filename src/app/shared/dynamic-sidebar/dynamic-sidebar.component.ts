import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dynamic-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './dynamic-sidebar.component.html',
  styleUrl: './dynamic-sidebar.component.css'
})
export class DynamicSidebarComponent {
  @Input() imageUrl: string = '';
  @Input() title: string = '';
  @Input() textContent: string = '';
}
