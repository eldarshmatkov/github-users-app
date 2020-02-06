import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {StoreRootObject} from '../store/storeRootObject.type';
import {select, Store} from '@ngrx/store';
import {selectorAppData} from '../store/app-data/app-data.selectors';
import {AppData} from '../store/app-data/app-data.type';

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.scss']
})
export class SingleUserComponent implements OnInit, OnDestroy {
  appData: AppData;

  constructor(private router: Router, private store: Store<StoreRootObject>) {
  }

  ngOnInit() {
    this.store.pipe(select(selectorAppData))
      .subscribe((data: AppData) => {
        this.appData = data;
      });
  }

  ngOnDestroy(): void {
  }

  goToMain() {
    this.router.navigate(['']);
  }
}
