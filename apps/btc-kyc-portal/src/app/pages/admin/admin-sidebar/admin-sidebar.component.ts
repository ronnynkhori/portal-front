import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent {
  @Input() adminName = '';
  @Input() adminId = '';
  @Input() adminInitials = '';
} 