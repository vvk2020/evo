import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  // title = 'evo';
  constructor(
    public title: Title,
    private meta: Meta,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Desk Page');
    this.meta.addTag({ property: 'og:descr', content: 'root_desc' });

    // Восстанавливаем title и метатеги при возврате на маршрут "/"
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.router.url === '/') {
          this.title.setTitle('Desk Page');

          // Удаляем ставрые (неактуальные) og-метатеги
          this.meta.getTags('property^="og:"').forEach((tag) => {
            this.meta.removeTagElement(tag);
          });

          // Добавяем метатеги корневого маршрута
          this.meta.addTag({ property: 'og:descr', content: 'root_desc' });
        }

        // Логгируем изменение метатегов
        console.clear();
        console.log('tags:');
        this.meta.getTags('property^="og:"').forEach((tag) => {
          console.log(tag);
        });
      });
  }
}
