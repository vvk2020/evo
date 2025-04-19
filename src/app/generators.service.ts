import { Injectable } from '@angular/core';
import { finalize, interval, map, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeneratorsService {
  // Настройки генераторов
  private _period: number = 2000; // период срабатывания генераторов, мс
  private _maxNumber: number = 1000; // max генерируемых чисел
  private _counterLimit: number = 25; // кол-во чисел, генерируемых за 1 проход
  // Счетчики
  private _seqCounter = 0; // последовательных чисел
  private _rndCounter = 0; // случайных чисел
  // Флаги блокировки попыток запуска уже запущенного потока
  private _seqCounterLock = false; // последовательных чисел
  private _rndCounterLock = false; // случайных чисел

  constructor() {}

  // Создание потока, генераующего последовательные числа
  public createSeqStream({
    period = this._period,
    counterLimit = this._counterLimit,
    startNum = this._seqCounter,
  }): Observable<number> {
    // Блокировка запуска, если поток уже запущен
    if (this._seqCounterLock) {
      throw new Error('Ошибка: генератор последовательных чисел уже запущен');
    }

    this._seqCounterLock = true; // блокировка потока
    this._seqCounter = startNum; // старт с заданного значения счетчика

    // Рестарт счетчика при достижении предельного значения
    if (this._seqCounter >= this._counterLimit) this._seqCounter = 0;
    return interval(period).pipe(
      take(counterLimit - this._seqCounter), // с учетом уже сгенерированных чисел
      map(() => this._seqCounter++),
      finalize(() => (this._seqCounterLock = false)) // разблокировка потока
    );
  }

  // Генерация случайных чисел с префиксом
  createRndStream({
    period = this._period,
    counterLimit = this._counterLimit,
    maxValue = this._maxNumber,
    startNum = this._rndCounter,
  }): Observable<string> {
    // Блокировка запуска, если поток уже запущен
    if (this._rndCounterLock) {
      throw new Error('Ошибка: генератор случайных чисел уже запущен');
    }

    this._rndCounterLock = true; // блокировка потока
    this._rndCounter = startNum; // старт с заданного значения счетчика

    // Рестарт счетчика при достижении предельного значения
    if (this._rndCounter >= this._counterLimit) this._rndCounter = 0;
    return interval(period).pipe(
      take(counterLimit - this._rndCounter), // с учетом уже сгенерированных чисел
      map(() => {
        this._rndCounter++;
        return `Random Value: ${Math.floor(Math.random() * maxValue)}`;
      }),
      finalize(() => (this._rndCounterLock = false)) // разблокировка потока
    );
  }
}
