import {Component, OnInit, Input, OnChanges, Output, EventEmitter} from '@angular/core';
import {SearchResponseUser} from '../../../shared/models/searchResponseUser.type';
import {Store} from '@ngrx/store';
import {StoreRootObject} from '../../../shared/models/storeRootObject.type';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})

export class TableViewComponent implements OnInit {
  users: SearchResponseUser[];

  constructor(private store: Store<StoreRootObject>) {}

  ngOnInit() {
    this.store.select('usersResponse').subscribe(
      (data) => {
        console.log(this.users, 'usersResponse from table-view');
        this.users = data.items;
      },
      (error => {
        console.log(error); })
    );
  }
}
