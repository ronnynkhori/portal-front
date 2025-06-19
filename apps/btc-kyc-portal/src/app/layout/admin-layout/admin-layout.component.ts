import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { AdminFooterComponent } from "../admin-footer/admin-footer.component";

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    AdminSidebarComponent,
    AdminFooterComponent
],
  templateUrl: './admin-layout.component.html'
})
export class AdminLayoutComponent {
  // Admin info properties
  adminName = 'Thomas Anderson';
  adminId = 'ADM-2023-001';
  adminInitials = 'TA';
}
