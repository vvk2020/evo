import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ErrorComponent } from './error/error.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { CreateRecipeComponent } from './create-recipe/create-recipe.component';
import { RecipeComponent } from './recipe/recipe.component';
import { CatalogComponent } from './catalog/catalog.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'recipes', component: RecipeComponent }, // рецепт
  { path: 'catalog', component: CatalogComponent }, // каталог рецептов
  { path: 'error', component: ErrorComponent }, // страница с ошибкой
  { path: 'registration', component: RegistrationComponent }, // регистрация
  { path: 'authorization', component: AuthorizationComponent }, // авторизация
  { path: 'create-recipe', component: CreateRecipeComponent }, // создание рецепта
  { path: '**', redirectTo: '' }, // перенаправление для несуществующих путей
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
