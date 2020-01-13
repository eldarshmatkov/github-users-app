import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {searchResponseUser} from '../../../shared/models/searchResponseUser.type';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})

export class TableViewComponent implements OnInit {
  @Output() isLoading = new EventEmitter<boolean>();
  users: searchResponseUser;

  constructor(private store: Store<{ usersResponse: searchResponseUser}>) {}

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
