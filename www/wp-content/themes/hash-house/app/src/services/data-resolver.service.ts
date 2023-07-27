import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpService } from "./http.service";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class DataResolverService implements Resolve<any>  {

  constructor(
    private httpService: HttpService,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

    const slug = state.url.replace(/^\//, '');

    if (!slug || slug[0] === '?' || slug[0] === '#') {
      return this.httpService.getPageData('home');
    }
    if (slug === 'about') {
      return this.httpService.getPageData('about-us');
    }

    return this.httpService.getProduct(slug);
  }
}
