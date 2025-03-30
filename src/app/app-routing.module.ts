import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'main',
    component: MainComponent,
  },
  {
    path: 'page',
    loadChildren: () => import('./page/page.module').then((m) => m.PageModule),
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
