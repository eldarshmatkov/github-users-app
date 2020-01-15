import {Component, OnInit, Input, OnChanges, Output, EventEmitter} from '@angular/core';
import {SearchResponseUser} from '../../../shared/models/searchResponseUser.type';
import {Store} from '@ngrx/store';
import {SearchResponse} from '../../../shared/models/searchResponse.type';
import {AppData} from '../../../shared/models/app-data.type';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})

export class TableViewComponent implements OnInit {
  @Output() isLoading = new EventEmitter<boolean>();
  users: SearchResponseUser[];

  constructor(private store: Store<{ usersResponse: SearchResponse, appData: AppData }>) {}

  ngOnInit() {
    this.store.select('usersResponse').subscribe(
      (data) => {
        this.users = data.items;
      },
      (error => {
        console.log(error); })
    );
  }
}
