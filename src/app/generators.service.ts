import { Injectable } from '@angular/core';
import { interval, map, Observable, Subject, take, takeUntil, tap } from 'rxjs';

/**
 * Интерфейс передачи сгенерированных чисел
 * @property seqNum? - последовательных
 * @property rndNum? - случайных
 */
export interface Data {
  seqNum?: number; // последовательное
  rndNum?: number; // случайное
}

@Injectable({
  providedIn: 'root',
})
export class GeneratorsService {
  private _period: number = 500; // период срабатывания генераторов, мс
  private _maxRndNum: number = 100; // максимум значения генериуемых случайных чисел
  private _counterLimit: number = 10; // максимальное количество чисел
  private _counter = 0; // текущее значение последовательности генерируемых чисел

  constructor() {}

  private destroy$ = new Subject<void>();

  // Создание потока, генераующего последовательные числа
  public createGenerator({
    period = this._period,
    maxValue: maxRndNum = this._maxRndNum,
    counterLimit = this._counterLimit,
    startNum = this._counter,
  }): Observable<Data> {
    this._counter = startNum; // старта с заданного значения счетчика
    // Рестарт счетчика при достижении предельного значения
    if (this._counter >= this._counterLimit) this._counter = 0;
    return interval(period).pipe(
      takeUntil(this.destroy$),
      take(counterLimit - this._counter), // с учетом уже сгенерированных чисел
      map(() => ({
        seqNum: ++this._counter,
        rndNum: Math.floor(Math.random() * maxRndNum),
      }))
    );
  }

  // Отменяем все подписки при уничтожении сервиса
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
