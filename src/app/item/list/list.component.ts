import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ItemListComponent implements OnInit, AfterViewInit {
  public ItemId: string | null = null;
  constructor(private activeRouter: ActivatedRoute) {}

  ngOnInit(): void {
    this.activeRouter.parent?.params.subscribe((params) => {
      this.ItemId = params['id'];
    });
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
    this.activeRouter.queryParams.subscribe((params) => {
      console.clear();
      console.log('Таблица параметров запроса маршрута');
      console.table(params);
    });
  }
}
