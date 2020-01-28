import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {StoreRootObject} from '../store/storeRootObject.type';
import {select, Store} from '@ngrx/store';
import {selectorAppData} from '../store/app-data/app-data.selectors';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';


@Injectable()
export class CanActivateRouteGuard implements CanActivate {

  constructor(private store: Store<StoreRootObject>, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.store.pipe(
      select(selectorAppData),
      map(
        (data) => {
          if (Object.keys(data.currentUser).length === 0) {
            this.router.navigate(['']);
          }
          return true;
        }
      )
    );
  }
}
