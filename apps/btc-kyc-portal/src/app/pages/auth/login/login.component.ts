import { Component, OnInit, AfterViewInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
// eslint-disable-next-line
import { AuthService } from 'libs/data-access/auth/src/lib/auth.service';
// eslint-disable-next-line
import { UserRole } from 'libs/models/src/lib/user.model';
import * as feather from 'feather-icons';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-700 to-green-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <!-- Background pattern -->
      <div class="absolute inset-0 overflow-hidden opacity-10">
        <div class="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full"></div>
        <div class="absolute top-1/4 -right-20 w-80 h-80 bg-white rounded-full"></div>
        <div class="absolute -bottom-32 left-1/3 w-[500px] h-[500px] bg-white rounded-full"></div>
      </div>
      
      <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl relative z-10 animate-fade-in">
        <div>
          <div class="flex justify-center mb-4">
            <img src="https://kyc.btc.bw/sim/assets/logo/coat.png" alt="BTC Logo" class="h-20 w-auto animate-fade-in-delay-1">
          </div>
          <h2 class="text-center text-2xl font-bold text-green-800 animate-fade-in-delay-1">Welcome Back</h2>
          <p class="mt-2 text-center text-sm text-gray-600 animate-fade-in-delay-2">
            Sign in to access your BTC services
          </p>
        </div>
        
        <form class="mt-8 space-y-6 animate-fade-in-delay-2" [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="space-y-5">
            <div class="space-y-1">
              <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span class="text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  </span>
                </div>
                <input 
                  formControlName="username"
                  id="username" 
                  name="username" 
                  type="text" 
                  autocomplete="username" 
                  required
                  class="appearance-none rounded-lg relative block w-full pl-10 px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm transition-all duration-200"
                  placeholder="Enter your username"
                />
              </div>
              <p *ngIf="usernameError" class="mt-1 text-sm text-red-600">{{ usernameError }}</p>
            </div>

            <div class="space-y-1">
              <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span class="text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-lock"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                  </span>
                </div>
                <input 
                  formControlName="password"
                  id="password" 
                  name="password" 
                  type="password" 
                  autocomplete="current-password" 
                  required
                  class="appearance-none rounded-lg relative block w-full pl-10 px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm transition-all duration-200"
                  placeholder="Enter your password"
                />
              </div>
              <p *ngIf="passwordError" class="mt-1 text-sm text-red-600">{{ passwordError }}</p>
            </div>
          </div>

          <div *ngIf="loginError" class="text-red-500 text-sm text-center bg-red-50 p-2 rounded-md">
            {{ loginError }}
          </div>

          <div>
            <button 
              type="submit" 
              [disabled]="loginForm.invalid || isLoading"
              class="group w-full py-3 px-4 border border-transparent text-base font-medium rounded-lg shadow-lg text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 hover:scale-[1.02] transform disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span *ngIf="isLoading" class="mr-2 inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-white"></span>
              <span *ngIf="!isLoading" class="flex items-center justify-center">
                <span class="mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-log-in"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
                </span>
                Sign in
              </span>
              <span *ngIf="isLoading" class="flex items-center justify-center">Processing...</span>
            </button>
          </div>

          <div class="mt-4 text-center">
            <a routerLink="/public" class="flex items-center justify-center text-sm font-medium text-green-700 hover:text-green-900 transition-colors duration-200 hover:underline">
              <span class="mr-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
              </span>
              Return to homepage
            </a>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    /* Fade-in animations */
    .animate-fade-in {
      animation: fadeIn 0.8s ease-out forwards;
    }
    
    .animate-fade-in-delay-1 {
      opacity: 0;
      animation: fadeIn 0.8s ease-out 0.3s forwards;
    }
    
    .animate-fade-in-delay-2 {
      opacity: 0;
      animation: fadeIn 0.8s ease-out 0.6s forwards;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class LoginComponent implements OnInit, AfterViewInit {
  loginForm: FormGroup;
  isLoading = false;
  loginError: string | undefined = undefined;

  get usernameError(): string | undefined {
    const control = this.loginForm.get('username');
    if (control?.touched && control?.errors?.['required']) {
      return 'Username is required';
    }
    return undefined;
  }

  get passwordError(): string | undefined {
    const control = this.loginForm.get('password');
    if (control?.touched && control?.errors?.['required']) {
      return 'Password is required';
    }
    return undefined;
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
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

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.loginError = undefined;

    this.authService.login(this.loginForm.value).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        // Redirect based on role
        if (response.role === UserRole.ADMIN) {
          this.router.navigate(['/admin']);
        } else if (response.role === UserRole.AGENT) {
          this.router.navigate(['/agent']);
        } else {
          this.router.navigate(['/public']);
        }
      },
      error: (error: any) => {
        this.isLoading = false;
        this.loginError = error.message || 'Failed to login. Please check your credentials.';
      }
    });
  }
} 