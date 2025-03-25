import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ItemListComponent implements OnInit {
  public ItemId: any = null;
  constructor(private activeRouter: ActivatedRoute) {}

  ngOnInit(): void {
    this.activeRouter.parent?.params.subscribe((params) => {
      this.ItemId = params['id'];
    });
  }
}
