import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GeneratorsService } from './generators.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  // Массивы для хранения чисел
  private _sequentialGen: number[] = []; // последовательных
  private _randomGen: string[] = []; // случайных

  // Observable-объекты, хранящие состояние и уведомляющие об изменениях
  private destroy$ = new Subject<void>();
  private sequentialSubscription$ = new Subject<void>();
  // private randomSubscription$ = new Subject<void>();

  constructor(private generator: GeneratorsService) {}

  // Запуск генерации последовательных чисел
  public startSequentialGen(): void {
    this.sequentialSubscription$.next();
    this._sequentialGen = [];

    this.generator
      .createSequentialStream()
      .pipe(takeUntil(this.sequentialSubscription$))
      .subscribe((num) => {
        this._sequentialGen.push(num);
      });
  }

  // Инициализация компонента
  ngOnInit(): void {
    // Запуск генераторов чисел
    this.startSequentialGen();
    // this.startRandomNumbers();
  }

  // Останов генератора последовательных чисел
  stopSequentialGen(): void {
    this.sequentialSubscription$.next();
  }

  // Сброс генератора последовательных чисел
  resetSequentialGen(): void {
    this.stopSequentialGen(); // остан генератора
    this._sequentialGen = []; // очистка массива данных
    this.generator.createSequentialStream(); // старт генератора
  }

  get sequentialGen() {
    return this._sequentialGen;
  }

  set sequentialGen(gen: number[]) {
    this._sequentialGen = gen;
  }

  // Отменяем все подписки при уничтожении компонента
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
