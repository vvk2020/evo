import { Injectable } from '@angular/core';
import { interval, map, Observable, Subject, take, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeneratorsService {
  private _period: number = 500; // период срабатывания генераторов, мс
  // private _maxNumber: number = 10; // максимум значений генерируемых чисел
  private _numberCount: number = 25; // максимальное количество чисел
  private _counter = 0; // текущее значение последовательности генерируемых чисел

  constructor() {}

  private destroy$ = new Subject<void>();

  // Создание потока, генераующего последовательные числа
  public createSequentialStream(
    period: number = this._period,
    maxNumber: number = this._numberCount
  ): Observable<number> {
    this._counter = 0; // для случая перезапуска
    return interval(period).pipe(
      takeUntil(this.destroy$),
      take(maxNumber),
      map(() => this._counter++)
    );
  }

  // Генерация случайных чисел с префиксом
  // createRandomStream(
  //   intervalTime: number,
  //   maxNumbers: number,
  //   maxValue: number = this._maxNumber
  // ): Observable<string> {
  //   return interval(intervalTime).pipe(
  //     takeUntil(this.destroy$),
  //     take(maxNumbers),
  //     map(() => Math.floor(Math.random() * maxValue)),
  //     map((num) => `Random Value: ${num + 1}`)
  //   );
  // }

  // Отменяем все подписки при уничтожении сервиса
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
