import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subject, Subscription, takeUntil } from 'rxjs';
import { GeneratorsService } from './generators.service';
import { MatTableDataSource } from '@angular/material/table';

interface Data {
  seq?: number;
  rnd?: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  // Флаги включения генераторов
  public seqGenEnabled: boolean = true;
  public rndGenEnabled: boolean = true;
  public anyGenEnabled: boolean = true;

  // Массивы для хранения чисел
  private _seqSet: number[] = []; // последовательных
  private _rndSet: string[] = []; // случайных

  // Источники данных таблицы шаблона
  public displayedColumns: string[] = ['seq', 'rnd'];
  public dataSource = new MatTableDataSource<Data>();

  // Observable-объекты, хранящие состояние и уведомляющие об изменениях
  private destroy$ = new Subject<void>();
  private seqSubscription$?: Subscription;
  private rndSubscription$?: Subscription;

  constructor(private generator: GeneratorsService) {}

  // Запуск генерации последовательных чисел
  public startSeqGenerator(counter?: number): void {
    this.seqGenEnabled = true;
    this.anyGenEnabled = true;

    // Отписка от предыдущей подписки
    if (this.seqSubscription$) {
      this.seqSubscription$.unsubscribe();
    }

    this.seqSubscription$ = this.generator
      .createSeqStream({ startNum: counter })
      .subscribe({
        next: (num) => this._seqSet.push(num),
        error: (err) => console.error('Ошибка:', err),
        complete: () => {
          this.seqGenEnabled = false;
          if (!this.rndGenEnabled) this.anyGenEnabled = false;
        },
      });
  }

  // Запуск генерации случайных чисел
  public startRndGenerator(counter?: number): void {
    this.rndGenEnabled = true;
    this.anyGenEnabled = true;

    // Отписка от предыдущей подписки
    if (this.rndSubscription$) {
      this.rndSubscription$.unsubscribe();
    }

    this.rndSubscription$ = this.generator
      .createRndStream({ startNum: counter })
      .subscribe({
        next: (str) => this._rndSet.push(str),
        error: (err) => console.error('Ошибка:', err),
        complete: () => {
          this.rndGenEnabled = false;
          if (!this.seqGenEnabled) this.anyGenEnabled = false;
        },
      });
  }

  // Запуск генерации чисел
  public startAllGenerators(counter?: number) {
    this.startSeqGenerator(counter);
    this.startRndGenerator(counter);
  }

  private getData() {
    if (this._seqSet.length === 0 && this._rndSet.length === 0) {
      return;
    }
    // Максимальная длина массивов
    const maxLength = Math.max(this._rndSet.length, this._seqSet.length);
    const newData: Data[] = [];
    for (let i = 0; i < maxLength; i++) {
      newData.push({
        seq: i < this._seqSet.length ? this._seqSet[i] : undefined,
        rnd: i < this._rndSet.length ? this._rndSet[i] : undefined,
      });
    }
    this.dataSource.data = newData;
  }

  // Инициализация компонента
  ngOnInit(): void {
    // Запуск всех генераторов чисел
    this.startAllGenerators();
    // Запуск периодического вывода в шаблон
    interval(250)
      .pipe(
        takeUntil(this.destroy$) // автоматическая отписка при уничтожении компонента
      )
      .subscribe(() => {
        this.getData();
      });
  }

  // Останов генератора последовательных чисел
  stopSeqGenerator(): void {
    this.seqSubscription$?.unsubscribe(); // .next();
    this.seqGenEnabled = false;
    if (!this.rndGenEnabled) this.anyGenEnabled = false;
  }

  // Останов генератора случайных чисел
  stopRndGenerator(): void {
    this.rndSubscription$?.unsubscribe(); // .next();
    this.rndGenEnabled = false;
    if (!this.seqGenEnabled) this.anyGenEnabled = false;
  }

  // Останов всех генераторов
  stopAllGenerators(): void {
    this.stopSeqGenerator();
    this.stopRndGenerator();
  }

  // Сброс генератора последовательных чисел
  resetSeqGenerator(): void {
    this.stopSeqGenerator(); // остан генератора
    this._seqSet = []; // очистка массива данных
    this.startSeqGenerator(0); // старт генератора
  }

  // Сброс генератора случайных чисел
  resetRndGenerator(): void {
    this.stopRndGenerator(); // остан генератора
    this._rndSet = []; // очистка массива данных
    this.startRndGenerator(0); // старт генератора
  }

  // Сброс всех генератора
  resetAllGenerators(): void {
    // Остан генераторов
    this.stopAllGenerators();
    // Очистка массивов данных
    this._seqSet = [];
    this._rndSet = [];
    // Старт подписок
    this.startAllGenerators(0);
  }

  get seqSet() {
    return this._seqSet;
  }

  set seqSet(numSet: number[]) {
    this._seqSet = [...numSet];
  }

  get rndSet() {
    return this._rndSet;
  }

  set rndSet(numSet: string[]) {
    this._rndSet = [...numSet];
  }

  // Отменяем все подписки при уничтожении компонента
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    [this.seqSubscription$, this.rndSubscription$].forEach((subscribe$) => {
      subscribe$?.unsubscribe();
    });
  }
}
