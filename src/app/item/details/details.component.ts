import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class ItemDetailsComponent implements OnInit {
  public ItemId: string | null = null;
  constructor(private activeRouter: ActivatedRoute) {}

  ngOnInit(): void {
    this.activeRouter.parent?.params.subscribe((params) => {
      this.ItemId = params['id'];
      console.clear();
      console.log('Таблица параметров маршрута');
      console.table(params);
    });
  }
}
