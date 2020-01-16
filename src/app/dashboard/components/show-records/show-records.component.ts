import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as AppDataActions from '../../../store/app-data/app-data.actions'
import {StoreRootObject} from '../../../shared/models/storeRootObject.type';

@Component({
  selector: 'app-show-records',
  templateUrl: './show-records.component.html',
  styleUrls: ['./show-records.component.scss']
})
export class ShowRecordsComponent implements OnInit {
  usersPerPage = 10;
  usersPerPageOptions: number[] = [5, 10, 20, 40, 80];

  constructor(private store: Store<StoreRootObject>) { }

  ngOnInit() {
  }

  setUserPerPage($event): void {
    this.store.dispatch(new AppDataActions.UpdateAppData({usersPerPage: $event}))
  }
}
