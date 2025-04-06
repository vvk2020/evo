import { AfterViewInit, Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import * as $ from 'jquery';
import 'datatables.net';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  constructor(public title: Title) {
    this.title.setTitle('charts & table');
  }

  // ng2-charts =================================

  // Линейный график ------------------
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль'],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'Ряд A',
        fill: true,
        tension: 0.5,
        borderColor: '#C41E3A',
        backgroundColor: 'rgba(255,0,0,0.3)',
      },
    ],
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false,
  };
  public lineChartLegend = true;

  // Круговая диаграмма ---------------

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels = [
    ['Download', 'Sales'],
    ['In', 'Store', 'Sales'],
    'Mail Sales',
  ];
  public pieChartDatasets = [
    {
      data: [300, 500, 100],
    },
  ];
  public pieChartLegend = true;
  public pieChartPlugins = [];

  // Столбцовая диаграмма -------------

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
    datasets: [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Ряд A' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Ряд B' },
    ],
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };

  // Радарная диаграмма ---------------

  public radarChartOptions: ChartConfiguration<'radar'>['options'] = {
    responsive: false,
  };
  public radarChartLabels: string[] = [
    'Еда',
    'Питье',
    'Сон',
    'Проектирование',
    'Кодирование',
    'Езда на велосипеде',
    'Бег',
  ];

  public radarChartDatasets: ChartConfiguration<'radar'>['data']['datasets'] = [
    { data: [65, 59, 90, 81, 56, 55, 40], label: 'Ряд A' },
    { data: [28, 48, 40, 19, 96, 27, 100], label: 'Ряд B' },
  ];

  // datatables.net =============================

  ngAfterViewInit(): void {
    $('#example').DataTable({
      // настройки
    });
  }
}
