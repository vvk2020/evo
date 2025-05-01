import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public isButtonAuthVisible: boolean = true;

  public toggleAuthButtonVisible(): void {
    this.isButtonAuthVisible = !this.isButtonAuthVisible;
  }


}
