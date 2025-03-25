import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent {
  public ItemId: string | null = null;
  constructor(private activeRouter: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.ItemId = this.activeRouter.snapshot.params['id'];
  }

  navigateWithQueryParams() {
    // console.log('this.activeRouter', this.activeRouter.queryParams);
    this.router.navigateByUrl('list');
    this.router.navigate(['list'], {
      relativeTo: this.activeRouter,
      queryParams: {
        list: 1,
        enable: true,
      },
      queryParamsHandling: 'merge', // сохраняем существующие параметры
    });
  }
}
