import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from '../components/custom-snackbar/custom-snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  success(message: string, title = 'Success'): void {
    this.show(message, title, 'success');
  }

  error(message: string, title = 'Error'): void {
    this.show(message, title, 'error');
  }

  private show(message: string, title: string, type: 'success' | 'error'): void {
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      data: {
        title,
        message,
        type
      },
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['shadow-lg']
    });
  }
} 