import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { DataProviderService, Post } from './data-provider.service';

@Injectable({
  providedIn: 'root',
})
export class PostsViewResolver implements Resolve<Post> {
  constructor(private dataProvider: DataProviderService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Post> {
    // return of(true);
    return this.dataProvider.getPostByIdAsJSON();
  }
}
