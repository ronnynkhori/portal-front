import { Component, AfterViewInit, NgZone, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import * as feather from 'feather-icons';
// eslint-disable-next-line
import { AuthService } from 'libs/data-access/auth/src/lib/auth.service';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [CommonModule, RouterModule, AdminSidebarComponent],
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit, AfterViewInit {
  // Admin info properties
  adminName = 'Thomas Anderson';
  adminId = 'ADM-2023-001';
  adminInitials = 'TA';
  
  constructor(
    private ngZone: NgZone,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Get current user data - in a real app this would fetch from AuthService
    this.getCurrentUser();
    
    // Initial attempt to replace icons
    setTimeout(() => {
      this.initializeIcons();
    }, 0);
  }

  ngAfterViewInit(): void {
    // Ensure icons are replaced after view is fully rendered
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.initializeIcons();
      }, 100);
    });
  }

  initializeIcons(): void {
    try {
      feather.replace();
    } catch (error) {
      console.error('Error initializing feather icons:', error);
    }
  }
  
  getCurrentUser(): void {
    // In a real implementation, this would get the current user from the AuthService
    // For now, we're using mock data
    try {
      // This would be replaced with actual auth service call
      // this.authService.getCurrentUser().subscribe(user => {
      //   this.adminName = user.name;
      //   this.adminId = user.id;
      //   this.adminInitials = this.getInitials(user.name);
      // });
      
      // Mock data for demonstration
      this.adminName = 'Thomas Anderson';
      this.adminId = 'ADM-2023-001';
      this.adminInitials = this.getInitials(this.adminName);
    } catch (error) {
      console.error('Error getting current user:', error);
    }
  }
  
  getInitials(name: string): string {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  }
} 