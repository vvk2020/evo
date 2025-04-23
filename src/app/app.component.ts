import {
  Component,
  ComponentRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { DynamicComponent } from './dynamic/dynamic.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('dynamicComp', { read: ViewContainerRef })
  private viewRef!: ViewContainerRef;
  private componentRef!: ComponentRef<DynamicComponent>;

  // Добавление компонента DynamicComponent
  addDynamicComp() {
    this.viewRef.clear();
    this.componentRef = this.viewRef.createComponent(DynamicComponent);
  }

  // Удаление компонента DynamicComponent
  delDynamicComp() {
    this.viewRef.clear();
  }
}
