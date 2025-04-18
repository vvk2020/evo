import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GeneratorsService, Data } from './generators.service';

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
  // Конфигурация генераторов
  public _genConfig: generatorConfig = {
    disable: true,
  };

  // Массивы для хранения чисел
  private _dataSet: Data[] = []; // последовательных

  // Observable-объекты, хранящие состояние и уведомляющие об изменениях
  private destroy$ = new Subject<void>();
  private subscription$ = new Subject<void>();

  constructor(private generator: GeneratorsService) {}

  // Запуск генерации последовательных чисел
  public startGenerator(counter?: number): void {
    this._genConfig.disable = true;
    this.subscription$.next(); // Отменяем предыдущую подписку
    this.generator
      .createGenerator({ startNum: counter })
      .pipe(takeUntil(this.subscription$))
      .subscribe({
        next: (data) => this._dataSet.push(data),
        complete: () => (this._genConfig.disable = false),
      });
  }

  // Инициализация компонента
  ngOnInit(): void {
    // Запуск генераторов чисел
    this.startGenerator();
  }

  // Останов генератора последовательных чисел
  stopGenerator(): void {
    this.subscription$.next();
    this._genConfig.disable = false;
  }

  // Сброс генератора последовательных чисел
  resetGenerator(): void {
    this.stopGenerator(); // остан генератора
    this._dataSet = []; // очистка массива данных
    this.startGenerator(0); // старт генератора
  }

  get dataSet() {
    return this._dataSet;
  }

  set dataSet(numSet: Data[]) {
    this._dataSet = [...numSet];
  }

  // Отменяем все подписки при уничтожении компонента
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
