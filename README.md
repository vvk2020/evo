# Практическое задание 5: Модули

- [x] 1. Создать приложение
- [x] 2. Создать компонент main
- [x] 3. Создать модуль с роутингом page
- [x] 4. В модуле page добавить компонент item
- [x] 5. Сделать компонент item lazyLoad загрузку
- [ ] 6. Добавить @angular/material
- [ ] 7. Интегрировать [tabs-компонент](https://material.angular.io/components/tabs/overview)
- [ ] 8. Прислать ссылку на репозитории к ответу на это задание

Должна получится такая структура приложения:

```mermaid
graph LR
    A[AppModule] --> B[Компонент main]
    A --> C[app.component.html]
    A --> D[Модуль page]
    D --> E[lazyload-компонент item]
    D --> F[Роутинг к page]
    C --> G[tabs Component @angular/material]
```
