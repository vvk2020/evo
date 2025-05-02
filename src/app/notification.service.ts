import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from './notification/notification.component';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  showSuccess(title: string, message: string): void {
    this.openNotification(title, message, 'success', 'check_circle_outline');
  }

  showError(title: string, message: string): void {
    this.openNotification(title, message, 'error', 'error');
  }

  showWarning(title: string, message: string): void {
    this.openNotification(title, message, 'warning', 'info');
  }

  private openNotification(
    title: string,
    message: string,
    type: 'success' | 'error' | 'warning',
    icon?: string
  ): void {
    this.snackBar.openFromComponent(NotificationComponent, {
      data: { type, title, message, icon },
      duration: 5000,
      panelClass: [`custom-notification-${type}`],
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
