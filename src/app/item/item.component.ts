import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent {
  public ItemId: any = null;
  constructor(private activeRouter: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.ItemId = this.activeRouter.snapshot.params['id'];
  }

  navigateWithQueryParams() {
    console.log('===');
    this.router.navigate(['/list'], {
      queryParams: {
        list: 1,
        enable: true,
      },
    });
  }
}
