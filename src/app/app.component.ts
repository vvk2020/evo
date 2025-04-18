import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GeneratorsService } from './generators.service';

// Конфигурации генераторов
type generatorConfig = {
  disable: boolean; // on/off-флаг
};
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  // Конфигурации генераторов
  public _seqGenConfig: generatorConfig = {
    disable: true,
  };
  public  _rndGenConfig: generatorConfig = {
    disable: true,
  };

  // Массивы для хранения чисел
  private _seqSet: number[] = []; // последовательных
  private _rndSet: number[] = []; // случайных

  // Observable-объекты, хранящие состояние и уведомляющие об изменениях
  private destroy$ = new Subject<void>();
  private seqSubscription$ = new Subject<void>();
  private rndSubscription$ = new Subject<void>();

  constructor(private generator: GeneratorsService) {}

  // Запуск генерации последовательных чисел
  public startSeqGenerator(counter?: number): void {
    this._seqGenConfig.disable = true;
    this.seqSubscription$.next(); // Отменяем предыдущую подписку
    this.generator
      .createSeqStream({ startNum: counter })
      .pipe(takeUntil(this.seqSubscription$))
      .subscribe({
        next: (num) => this._seqSet.push(num + 1),
        complete: () => (this._seqGenConfig.disable = false),
      });
  }

  // Запуск генерации случайных чисел
  startRndGenerator(): void {
    this._rndGenConfig.disable = true;
    this.rndSubscription$.next();
    // this._rndSet = [];

    this.generator
      .createRndStream({period: 2000})
      .pipe(takeUntil(this.rndSubscription$))
      .subscribe({
        next: (num) => this._rndSet.push(num),
        complete: () => (this._rndGenConfig.disable = false),
      });
  }

  // Инициализация компонента
  ngOnInit(): void {
    // Запуск генераторов чисел
    this.startSeqGenerator();
    this.startRndGenerator();
  }

  // Останов генератора последовательных чисел
  stopSeqGenerator(): void {
    this.seqSubscription$.next();
    this._seqGenConfig.disable = false;
  }

  // Останов генератора случайных чисел
  stopRndGenerator(): void {
    this.rndSubscription$.next();
    this._rndGenConfig.disable = false;
  }

  // Сброс генератора последовательных чисел
  resetSeqGenerator(): void {
    this.stopSeqGenerator(); // остан генератора
    this._seqSet = []; // очистка массива данных
    this.startSeqGenerator(0); // старт генератора
  }

  resetRndGenerator(): void {
    this.stopRndGenerator(); // остан генератора
    this._rndSet = []; // очистка массива данных
    this.startRndGenerator(); // старт генератора
  }

  get seqSet() {
    return this._seqSet;
  }

  set seqSet(numSet: number[]) {
    this._seqSet = [...numSet];
  }

  get rndSet() {
    // map((num) => `Random Value: ${num + 1}`)
    return this._rndSet;
  }

  set rndSet(numSet: number[]) {
    this._rndSet = [...numSet];
  }

  // Отменяем все подписки при уничтожении компонента
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
