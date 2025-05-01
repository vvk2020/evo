import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import {
  Account,
  AuthenticationService,
  User,
} from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css'],
})
export class AuthorizationComponent implements OnInit, OnDestroy {
  private _Authentication$?: Subscription;
  public authForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _authServ: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    // Инициализация формы
    this.authForm = this.fb.group({
      login: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  public onSubmit() {
    // вызов изменения значения поля для активации валидации (реактивные формы)
    this.authForm.patchValue({
      login: this.authForm.value.login,
      password: this.authForm.value.password,
    });
    // Валидация и запрос JWT-токена
    if (this.authForm.valid) {
      this.autentication({
        username: this.authForm.get('login')?.value,
        password: this.authForm.get('password')?.value,
      }).subscribe({
        next: (account) => {
          console.log(`account:`, account);
          // Обработка успешной аутентификации
          this.router.navigate(['']);
          this.onReset();
        },
        error: (err) => {
          this.router.navigate(['/error']);

          // Вывод ошибки в консоль
          console.clear();
          console.error('Ошибка:', err);
        },
      });
    } else {
      this.authForm.markAllAsTouched();
    }
  }

  // Сброс формы к валидному состоянию
  public onReset(): void {
    // Сброс значений полей ("" вместо null)
    this.authForm.reset({
      login: '',
      password: '',
    });

    // Сброс состояния формы
    this.authForm.markAsPristine(); // нет изменений (dirty=false)
    this.authForm.markAsUntouched(); // нет взаимодействия (touched=false)

    // Очиcтка ошибок валидации
    Object.keys(this.authForm.controls).forEach((key) => {
      this.authForm.get(key)?.setErrors(null);
    });

    // Принудительное обновление (для Angular Material)
    setTimeout(() => {
      this.authForm.updateValueAndValidity();
    });
  }

  private autentication(user: User): Observable<Account> {
    const result$ = new Subject<Account>();
    this._Authentication$?.unsubscribe(); // отписка от предыдущей подписки
    this._Authentication$ = this._authServ
      .logining(user)
      ?.pipe(
        takeUntil(result$) // автоматическая отписка при завершении
      )
      .subscribe({
        next: (resp) => {
          this._authServ.account = resp;
          result$.next(resp);
          result$.complete();
        },
        error: (err) => result$.error(err),
      });
    return result$.asObservable(); // возврат Observable
  }

  ngOnDestroy() {
    this._Authentication$?.unsubscribe();
  }
}
