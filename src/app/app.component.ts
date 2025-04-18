import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GeneratorsService } from './generators.service';
import { MatTableDataSource } from '@angular/material/table';

// Конфигурации генераторов
type generatorConfig = {
  disable: boolean; // on/off-флаг
};

interface Data {
  seq?: number;
  rnd?: number;
}
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
  public _rndGenConfig: generatorConfig = {
    disable: true,
  };

  // Массивы для хранения чисел
  private _seqSet: number[] = []; // последовательных
  private _rndSet: number[] = []; // случайных

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
    this._seqGenConfig.disable = true;
    this.seqSubscription$.next(); // Отменяем предыдущую подписку
    this.generator
      .createSeqStream({ startNum: counter })
      .pipe(takeUntil(this.seqSubscription$))
      .subscribe({
        next: (num) => this._seqSet.push(num),
        complete: () => (this._seqGenConfig.disable = false),
      });
  }

  getData() {
    // Максимальная длина массивов
    const maxLength = Math.max(this._rndSet.length, this._seqSet.length);
    const newData: Data[] = [];
    for (let i = 0; i < maxLength; i++) {
      newData.push({
        seq: i < this._seqSet.length ? this._seqSet[i] : undefined,
        rnd: i < this._rndSet.length ? this._rndSet[i] : undefined,
        // rnd: i < this._rndSet.length ? this._rndSet[i] : undefined,
        // seq: i < this._seqSet.length ? this._seqSet[i] : undefined,
      });
      console.log('this._rndSet', this._rndSet);
      console.log('this._seqSet', this._seqSet);
      console.log('this.dataSource.data', this.dataSource.data);
      // this.dataSource = new MatTableDataSource(newData);
      this.dataSource.data = newData;
    }
  }

  // Запуск генерации случайных чисел
  startRndGenerator(): void {
    this._rndGenConfig.disable = true;
    this.rndSubscription$.next();
    // this._rndSet = [];

    this.generator
      .createRndStream({})
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
    setInterval(() => {
      this.getData();
    }, 2000);
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
