import {Component, OnInit, Input, OnChanges, Output, EventEmitter} from '@angular/core';
import {SearchResponseUser} from '../../../shared/models/searchResponseUser.type';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})

export class TableViewComponent implements OnInit {
  @Output() isLoading = new EventEmitter<boolean>();
  users: SearchResponseUser;

  constructor(private store: Store<{ usersResponse: SearchResponseUser}>) {}

  ngOnInit() {
    this.store.select('usersResponse').subscribe(
      (data) => {
        this.users = data;
      },
      (error => {
        console.log(error); })
    );
  }
}
