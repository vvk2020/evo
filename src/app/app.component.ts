import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'evoApp';
  public comicsKings = [
    {
      name: 'Чарльз Чаплин',
      birthDate: '1889-04-16',
      deathDate: '1977-12-25',
      photoLink: './assets/images/chaplin.avif',
      description:
        'Британский актёр, кинорежиссёр, сценарист, композитор, продюсер и монтажёр.',
      rating: 0,
    },
    {
      name: 'Луи де Фюнес',
      birthDate: '1914-07-31',
      deathDate: '1983-01-27',
      photoLink: './assets/images/funes.avif',
      description:
        'Французский киноактёр, кинорежиссёр и сценарист испанского происхождения, один из величайших комиков мирового кино.',
      rating: 0,
    },
    {
      name: 'Георгий Вицин',
      birthDate: '1917-04-18',
      deathDate: '2001-10-22',
      photoLink: './assets/images/vitsin.avif',
      description:
        'Cоветский и русский актёр театра, кино и озвучивания. Народный артист СССР.',
      rating: 0,
    },
    {
      name: 'Юрий Никулин',
      birthDate: '1921-12-18',
      deathDate: '1997-08-21',
      photoLink: './assets/images/nikulin.avif',
      description:
        'Cоветский и российский артист цирка (клоун), цирковой режиссёр, киноактёр, телеведущий. Герой Социалистического Труда, народный артист СССР, лауреат Государственной премии РСФСР им. братьев Васильевых. Участник Великой Отечественной войны.',
      rating: 0,
    },
    {
      name: 'Евгений Леонов',
      birthDate: '1926-09-02',
      deathDate: '1994-01-29',
      photoLink: './assets/images/leonov.avif',
      description:
        'Советский и российский актёр театра и кино, мастер озвучивания; народный артист СССР, лауреат Государственной премии Российской Федерации, Государственной премии СССР, Государственной премии РСФСР имени братьев Васильевых и премии Ленинского комсомола, кавалер ордена Ленина.',
      rating: 0,
    },
    {
      name: 'Евгений Моргунов',
      birthDate: '1927-04-27',
      deathDate: '1999-06-25',
      photoLink: './assets/images/morgunov.avif',
      description:
        'Cоветский и российский актёр театра и кино, кинорежиссёр, сценарист, кинопродюсер; заслуженный артист РСФСР.',
      rating: 0,
    },
    {
      name: 'Пьер Ришар',
      birthDate: '1934-08-16',
      deathDate: '',
      photoLink: './assets/images/richard.avif',
      description: 'Французский киноактёр и кинорежиссёр.',
      rating: 0,
    },
    {
      name: 'Савелий Крамаров',
      birthDate: '1934-10-13',
      deathDate: '1995-06-06',
      photoLink: './assets/images/kramarov.avif',
      description:
        'Cоветский и американский киноактёр; заслуженный артист РСФСР',
      rating: 0,
    },
    {
      name: 'Валентин Гафт',
      birthDate: '1935-09-02',
      deathDate: '2020-12-12',
      photoLink: './assets/images/gaft.avif',
      description:
        'Советский и российский актёр, театральный режиссёр, поэт, писатель; народный артист РСФСР. Лауреат премий «Золотой орёл» и «Золотая маска».',
      rating: 0,
    },
    {
      name: 'Андрей Миронов',
      birthDate: '1941-03-07',
      deathDate: '1987-08-16',
      photoLink: './assets/images/mironov.avif',
      description:
        'Cоветский актёр театра и кино, артист эстрады, телеведущий; народный артист РСФСР.',
      rating: 0,
    },
    {
      name: 'Робин Уильямс',
      birthDate: '1951-07-21',
      deathDate: '2014-08-11',
      photoLink: './assets/images/williams.avif',
      description:
        'Американский актёр, сценарист, продюсер, комик (стендап-комик).',
      rating: 0,
    },
    {
      name: 'Иван Ургант',
      birthDate: '1978-04-16',
      deathDate: '',
      photoLink: './assets/images/urgant.avif',
      description:
        'Российский актёр театра, кино, телевидения и дубляжа, режиссёр, сценарист, продюсер, шоумен, теле- и радиоведущий, певец, композитор, юморист, гитарист и мультиинструменталист.',
      rating: 0,
    },
  ];
}
