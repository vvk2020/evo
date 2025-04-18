import { Injectable } from '@angular/core';
import { interval, map, Observable, Subject, take, takeUntil, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeneratorsService {
  private _period: number = 2000; // период срабатывания генераторов, мс
  private _maxNumber: number = 1000; // максимум значений генерируемых чисел
  private _counterLimit: number = 25; // максимальное количество чисел
  private _counter = 0; // текущее значение последовательности генерируемых чисел

  constructor() {}

  private destroy$ = new Subject<void>();

  // Создание потока, генераующего последовательные числа
  public createSeqStream({
    period = this._period,
    counterLimit = this._counterLimit,
    startNum = this._counter,
  }): Observable<number> {
    this._counter = startNum; // старта с заданного значения счетчика
    // Рестарт счетчика при достижении предельного значения
    if (this._counter >= this._counterLimit) this._counter = 0;
    return interval(period).pipe(
      takeUntil(this.destroy$),
      take(counterLimit - this._counter), // с учетом уже сгенерированных чисел
      map(() => this._counter++)
    );
  }

  // Генерация случайных чисел с префиксом
  createRndStream({
    period = this._period,
    counterLimit = this._counterLimit,
    maxValue = this._maxNumber,
  }): Observable<number> {
    // Рестарт счетчика при достижении предельного значения
    if (this._counter >= this._counterLimit) this._counter = 0;
    return interval(period).pipe(
      takeUntil(this.destroy$),
      take(counterLimit - this._counter), // с учетом уже сгенерированных чисел
      map(() => Math.floor(Math.random() * maxValue)),
      tap(num => console.log('wow:',num))
    );
  }

  // Отменяем все подписки при уничтожении сервиса
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
