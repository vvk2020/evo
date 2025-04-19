import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
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
  private seqSubscription$ = new Subject<void>();
  private rndSubscription$ = new Subject<void>();

  constructor(private generator: GeneratorsService) {}

  // Запуск генерации последовательных чисел
  public startSeqGenerator(counter?: number): void {
    this.seqGenEnabled = true;
    this.anyGenEnabled = true;
    this.seqSubscription$.next(); // Отменяем предыдущую подписку
    this.generator
      .createSeqStream({ startNum: counter })
      .pipe(takeUntil(this.seqSubscription$))
      .subscribe({
        next: (num) => this._seqSet.push(num),
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
    this.rndSubscription$.next();
    this.generator
      .createRndStream({ startNum: counter })
      .pipe(takeUntil(this.rndSubscription$))
      .subscribe({
        next: (str) => this._rndSet.push(str),
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
    // Максимальная длина массивов
    const maxLength = Math.max(this._rndSet.length, this._seqSet.length);
    const newData: Data[] = [];
    for (let i = 0; i < maxLength; i++) {
      newData.push({
        seq: i < this._seqSet.length ? this._seqSet[i] : undefined,
        rnd: i < this._rndSet.length ? this._rndSet[i] : undefined,
      });
      this.dataSource.data = newData;
    }
  }

  // Инициализация компонента
  ngOnInit(): void {
    // Запуск генераторов чисел
    this.startSeqGenerator();
    this.startRndGenerator();
    // Обновление таблицы данных
    setInterval(() => {
      this.getData();
    }, 250);
  }

  // Останов генератора последовательных чисел
  stopSeqGenerator(): void {
    this.seqSubscription$.next();
    this.seqGenEnabled = false;
    if (!this.rndGenEnabled) this.anyGenEnabled = false;
  }

  // Останов генератора случайных чисел
  stopRndGenerator(): void {
    this.rndSubscription$.next();
    this.rndGenEnabled = false;
    if (!this.seqGenEnabled) this.anyGenEnabled = false;
  }

  // Останов всех генераторов
  stopAllGenerators(): void {
    this.seqSubscription$.next();
    this.rndSubscription$.next();
    this.seqGenEnabled = false;
    this.rndGenEnabled = false;
    this.anyGenEnabled = false;
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
    this.stopSeqGenerator();
    this.stopRndGenerator();
    // Очистка массивов данных
    this._seqSet = [];
    this._rndSet = [];
    // Старт генераторов
    // this.startSeqGenerator(0);
    // this.startRndGenerator(0);
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
  }
}
