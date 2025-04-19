import { Injectable } from '@angular/core';
import { interval, map, Observable, Subject, take, takeUntil, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeneratorsService {
  private _period: number = 2000; // период срабатывания генераторов, мс
  private _maxNumber: number = 1000; // максимум значений генерируемых чисел
  private _counterLimit: number = 25; // максимальное количество чисел
  private _seqCounter = 0; // текущее значение последовательности генерируемых чисел
  private _rndCounter = 0; // текущее значение последовательности генерируемых чисел

  constructor() {}

  private destroy$ = new Subject<void>();

  // Создание потока, генераующего последовательные числа
  public createSeqStream({
    period = this._period,
    counterLimit = this._counterLimit,
    startNum = this._seqCounter,
  }): Observable<number> {
    this._seqCounter = startNum; // старт с заданного значения счетчика
    // Рестарт счетчика при достижении предельного значения
    if (this._seqCounter >= this._counterLimit) this._seqCounter = 0;
    return interval(period).pipe(
      takeUntil(this.destroy$),
      take(counterLimit - this._seqCounter), // с учетом уже сгенерированных чисел
      map(() => this._seqCounter++)
    );
  }

  // Генерация случайных чисел с префиксом
  createRndStream({
    period = this._period,
    counterLimit = this._counterLimit,
    maxValue = this._maxNumber,
    startNum = this._rndCounter,
  }): Observable<number> {
    console.log(
      'counterLimit / this._rndCounter',
      counterLimit,
      ' / ',
      this._rndCounter
    );
    this._rndCounter = startNum; // старт с заданного значения счетчика
    // Рестарт счетчика при достижении предельного значения
    if (this._rndCounter >= this._counterLimit) this._rndCounter = 0;
    return interval(period).pipe(
      takeUntil(this.destroy$),
      take(counterLimit - this._rndCounter), // с учетом уже сгенерированных чисел
      map(() => {
        this._rndCounter++;
        return Math.floor(Math.random() * maxValue);
      })
    );
  }

  // Отменяем все подписки при уничтожении сервиса
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
