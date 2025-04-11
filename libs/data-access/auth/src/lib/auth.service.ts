import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { User, UserRole } from 'libs/models/src/lib/user.model';

interface AuthState {
  user: User | null;
  token: string | null;
  role: UserRole | null;
  isAuthenticated: boolean;
}

interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  user: User;
  token: string;
  role: UserRole;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly initialState: AuthState = {
    user: null,
    token: null,
    role: null,
    isAuthenticated: false
  };

  private readonly authState$ = new BehaviorSubject<AuthState>(this.initialState);

  constructor() {
    // Check for saved auth state in localStorage
    this.loadAuthState();
  }

  get isAuthenticated$(): Observable<AuthState> {
    return this.authState$.asObservable().pipe(
      tap(state => state.isAuthenticated)
    );
  }

  get currentUser$(): Observable<AuthState> {
    return this.authState$.asObservable().pipe(
      tap(state => state.user)
    );
  }

  get userRole$(): Observable<AuthState> {
    return this.authState$.asObservable().pipe(
      tap(state => state.role)
    );
  }

  login(credentials: LoginCredentials): Observable<LoginResponse> {
    // This is a mock implementation. In a real app, this would make an HTTP request
    if (credentials.username === 'admin@btc.com' && credentials.password === 'admin123') {
      const response: LoginResponse = {
        user: {
          id: '1',
          firstName: 'Admin',
          lastName: 'User',
          nationalId: 'ADMIN123',
          phoneNumber: '12345678',
          dateOfBirth: new Date('1990-01-01'),
          address: 'Admin Address',
          createdAt: new Date(),
          updatedAt: new Date(),
          isKycVerified: true,
          kycStatus: 'VERIFIED' as any
        },
        token: 'mock-jwt-token',
        role: UserRole.ADMIN
      };

      return of(response).pipe(
        delay(500),
        tap(res => this.setAuthState(res))
      );
    } else if (credentials.username === 'agent@btc.com' && credentials.password === 'agent123') {
      const response: LoginResponse = {
        user: {
          id: '2',
          firstName: 'Agent',
          lastName: 'User',
          nationalId: 'AGENT123',
          phoneNumber: '87654321',
          dateOfBirth: new Date('1991-02-02'),
          address: 'Agent Address',
          createdAt: new Date(),
          updatedAt: new Date(),
          isKycVerified: true,
          kycStatus: 'VERIFIED' as any
        },
        token: 'mock-jwt-token',
        role: UserRole.AGENT
      };

      return of(response).pipe(
        delay(500),
        tap(res => this.setAuthState(res))
      );
    }

    return throwError(() => new Error('Invalid credentials'));
  }

  logout(): void {
    localStorage.removeItem('auth_state');
    this.authState$.next(this.initialState);
  }

  private setAuthState(response: LoginResponse): void {
    const newState: AuthState = {
      user: response.user,
      token: response.token,
      role: response.role,
      isAuthenticated: true
    };

    this.authState$.next(newState);

    // Save to localStorage for persistence
    localStorage.setItem('auth_state', JSON.stringify(newState));
  }

  private loadAuthState(): void {
    const savedState = localStorage.getItem('auth_state');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        this.authState$.next(parsedState);
      } catch (error) {
        console.error('Error parsing saved auth state', error);
        localStorage.removeItem('auth_state');
      }
    }
  }
}
