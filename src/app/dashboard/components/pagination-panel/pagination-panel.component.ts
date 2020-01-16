import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {PagerService} from '../../../shared/services/pager.service';
import {SearchResponse} from '../../../shared/models/searchResponse.type';
import {SearchResponseUser} from '../../../shared/models/searchResponseUser.type';
import {PagerType} from '../../../shared/models/pager.type';
import {Store} from '@ngrx/store';
import * as AppDataActions from '../../../store/app-data/app-data.actions';
import {AppData} from '../../../shared/models/app-data.type';
import {StoreRootObject} from '../../../shared/models/storeRootObject.type';

@Component({
  selector: 'app-pagination-panel',
  templateUrl: './pagination-panel.component.html',
  styleUrls: ['./pagination-panel.component.scss']
})
export class PaginationPanelComponent implements OnInit, OnChanges {
  users: SearchResponse;
  usersPerPage: number;
  pager: PagerType;
  pagedItems: SearchResponseUser[];

  constructor(private pagerService: PagerService, private store: Store<StoreRootObject>) {
  }

  ngOnChanges() {
  }

  ngOnInit() {
    this.store.select('usersResponse').subscribe(
      (data) => {
        this.users = data;
      },
      (error => {
        console.log(error);
      })
    );
    this.store.select('appData').subscribe(
      (data) => {
        console.log(data, 'subscribe to appData');
        this.usersPerPage = data.usersPerPage ? data.usersPerPage : this.usersPerPage;
      },
      (error => {
        console.log(error);
      })
    );
  }

  changePage(page: number): void {
    this.store.dispatch(new AppDataActions.UpdateAppData({currentPage: page}));
  }

  setPage(page: number): void {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.users.total_count, page, this.usersPerPage);

    // get current page of items
    this.pagedItems = this.users.items.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}
