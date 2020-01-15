import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as AppDataActions from '../../../store/app-data/app-data.actions'
import {SearchResponse} from '../../../shared/models/searchResponse.type';
import {AppData} from '../../../shared/models/app-data.type';

@Component({
  selector: 'app-show-records',
  templateUrl: './show-records.component.html',
  styleUrls: ['./show-records.component.scss']
})
export class ShowRecordsComponent implements OnInit {
  usersPerPage = 10;
  usersPerPageOptions: number[] = [5, 10, 20, 40, 80];

  constructor(private store: Store<{ usersResponse: SearchResponse, appData: AppData }>) { }

  ngOnInit() {
  }

  setUserPerPage($event): void {
    this.store.dispatch(new AppDataActions.UpdateAppData({usersPerPage: $event}))
  }
}
