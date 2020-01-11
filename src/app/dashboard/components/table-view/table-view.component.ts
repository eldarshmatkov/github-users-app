import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Store} from '@ngrx/store';
import {searchResponse} from '../../../shared/Models/searchResponse.type';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})

export class TableViewComponent implements OnInit {
  @Output() isLoading = new EventEmitter<boolean>();
  users: searchResponse;

  constructor(private store: Store<{ usersResponse: searchResponse}>) {}

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
