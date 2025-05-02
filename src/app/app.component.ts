import { Component } from '@angular/core';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private notification: NotificationService) {}

  public isButtonAuthVisible: boolean = true;

  public toggleAuthButtonVisible(): void {
    this.isButtonAuthVisible = !this.isButtonAuthVisible;
  }

  showNotification() {
    // this.notification.showSuccess(
    //   'Успешное выполнение',
    //   'Данные были успешно сохранены в системе'
    // );
    // this.notification.showWarning(
    //   'Успешное выполнение',
    //   'Данные были успешно сохранены в системе'
    // );
    this.notification.showError(
      'Успешное выполнение',
      'Данные были успешно сохранены в системе'
    );
  }
}
