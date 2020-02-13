import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {StoreRootObject} from '../store/storeRootObject.type';
import {select, Store} from '@ngrx/store';
import {selectorAppData, selectorUserEntityById} from '../store/app-data/app-data.selectors';
import {AppData} from '../store/app-data/app-data.type';
import {UserReposResponse} from '../store/users-repos/userReposResponse.type';
import {ReposResponse} from '../store/users-repos/reposResponse.type';
import {flatMap} from 'rxjs/operators';

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.scss']
})
export class SingleUserComponent implements OnInit, OnDestroy {
  currentUser: ReposResponse;

  constructor(private router: Router, private store: Store<StoreRootObject>) {
  }

  ngOnInit() {
    this.store.pipe(
      select(selectorAppData),
      flatMap((appData) => this.store.pipe(select(selectorUserEntityById(appData.currentUser)))))
      .subscribe((currentUser: ReposResponse) => this.currentUser = currentUser);
  }

  ngOnDestroy(): void {
  }

  goToMain() {
    this.router.navigate(['']);
  }
}
