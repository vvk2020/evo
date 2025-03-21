import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {
  static readonly MAX_PERIOD: number = 100000; // максимальное значение периода
  static readonly DEFAULT_PERIOD: number = 100; // значение периода по умолчанию
  static readonly MIN_PERIOD: number = 1; // минимальное значение периода

  private _counter: number = 0;
  private _period: number = CounterComponent.DEFAULT_PERIOD;
  private _counterId: any = null; // ID счетчика

  @Output() messageEvent = new EventEmitter<number>();

  //! Задание нового периода срабатывания счетчика
  public set period(value: number) {
    const newPeriod = this.checkValuePeriod(value);
    if (newPeriod && newPeriod !== this._period) {
      this.startCounter(newPeriod); // рестарт счетчика счетчика с новым периодом
    }
  }

  //! Вывод заданного значения периода срабатывания счетчика
  public get period() {
    return this._period;
  }

  //! Проверка нового значения периода (undefined если не в диапазоне)
  private checkValuePeriod(value: number): any {
    const period = Math.round(value);
    if (
      value &&
      period < CounterComponent.MAX_PERIOD &&
      period >= CounterComponent.MIN_PERIOD
    )
      return period;
  }

  //! Сброс счетчика
  public resetCounter(period: number = 1000): void {
    this._counter = 0;
  }

  //! Функция запуска счетчика
  // Если
  public startCounter(period: number = this._period): void {
    if (this._period !== period) this._period = period;
    this.stopCounter(); // останов запущенного счетчика
    this._counterId = setInterval(() => {
      this.messageEvent.emit(this._counter++); // Отправляем сообщение
    }, period);
  }

  //! Функция останова счетчика
  public stopCounter(): void {
    if (this._counterId !== null) {
      clearInterval(this._counterId);
      this._counterId = null;
    }
  }

  public ngOnInit(): void {
    this.startCounter(); // старт счетчика
  }
}
