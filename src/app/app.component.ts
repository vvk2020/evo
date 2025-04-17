import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GeneratorsService } from './generators.service';

// Конфигурации генераторов
type generatorConfig = {
  enable: boolean; // on/off-флаг
};
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  // Конфигурации генераторов
  _seqGenConfig: generatorConfig = {
    enable: true,
  };
  private _rndGenConfig: generatorConfig = {
    enable: true,
  };

  // Массивы для хранения чисел
  private _sequentialSeq: number[] = []; // последовательных
  // private _randomSeq: string[] = []; // случайных

  // Observable-объекты, хранящие состояние и уведомляющие об изменениях
  private destroy$ = new Subject<void>();
  private seqSubscription$ = new Subject<void>();
  // private rndSubscription$ = new Subject<void>();

  constructor(private generator: GeneratorsService) {}

  // Запуск генерации последовательных чисел
  public startSeqGenerator(): void {
    this.seqSubscription$.next();
    // this._sequentialSeq = [];
    this.generator
      .createSequentialStream()
      .pipe(takeUntil(this.seqSubscription$))
      .subscribe((num) => {
        this._sequentialSeq.push(num + 1);
      });
  }

  // Инициализация компонента
  ngOnInit(): void {
    // Запуск генераторов чисел
    this.startSeqGenerator();
    // this.startRandomNumbers();
  }

  // Останов генератора последовательных чисел
  stopSeqGenerator(): void {
    this.seqSubscription$.next();
    this._seqGenConfig.enable = false;
  }

  // Сброс генератора последовательных чисел
  resetSeqGenerator(): void {
    this.stopSeqGenerator(); // остан генератора
    this._sequentialSeq = []; // очистка массива данных
    this.startSeqGenerator(); // старт генератора
  }

  get sequentialSeq() {
    return this._sequentialSeq;
  }

  set sequentialSeq(sequence: number[]) {
    this._sequentialSeq = [...sequence];
  }

  // Отменяем все подписки при уничтожении компонента
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
