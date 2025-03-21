import { Component, ViewChild } from '@angular/core';
import { CounterComponent } from './counter/counter.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild(CounterComponent) private secondComponent!: CounterComponent;

  public message: string = 'hello!';
  public counter: number = 0;
  public periodValue: number = CounterComponent.DEFAULT_PERIOD; // период срабатывания

  //! Получение сообщения от app-second
  receiveMessage($msg: number) {
    this.counter = $msg;
  }

  //! Wrapper сБроса счетчика
  resetCounter(): void {
    this.secondComponent!.resetCounter();
    this.counter = 0;
  }

  //!  Wrapper останова счетчика
  stopCounter(): void {
    this.secondComponent!.stopCounter();
  }

  //!  Wrapper останова счетчика
  startCounter(): void {
    this.secondComponent!.startCounter();
  }

  //! Обработчик изменения периода счетчика
  onEnterPeriod(event: Event): void {
    // Проверка на integer значения, введенного в input
    const inputElement = event.target as HTMLInputElement;
    const inputValue = parseInt(inputElement.value, 10);
    if (
      !isNaN(inputValue) &&
      inputValue.toString() === inputElement.value.trim()
    ) {
      this.secondComponent!.period = inputValue;
      this.periodValue = this.secondComponent!.period; // возврат в input заданного значения
      inputElement.classList.remove('invalid-input');
    } else inputElement.classList.add('invalid-input');
  }
}
