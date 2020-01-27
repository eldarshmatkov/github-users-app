import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {PagerService} from '../../../shared/services/pager.service';
import {SearchResponse} from '../../../shared/models/searchResponse.type';
import {SearchResponseUser} from '../../../shared/models/searchResponseUser.type';
import {PagerType} from '../../../shared/models/pager.type';
import {select, Store} from '@ngrx/store';
import * as AppDataActions from '../../../store/app-data/app-data.actions';
import {StoreRootObject} from '../../../shared/models/storeRootObject.type';
import {Subscription} from 'rxjs';
import {selectorAppData} from '../../../store/app-data/app-data.selectors';
import {selectorUsersResponse} from '../../../store/users/users.selectors';

@Component({
  selector: 'app-pagination-panel',
  templateUrl: './pagination-panel.component.html',
  styleUrls: ['./pagination-panel.component.scss']
})
export class PaginationPanelComponent implements OnInit, OnChanges, OnDestroy {
  users: SearchResponse;
  usersPerPage: number;
  currentPage: number;
  pager: PagerType;
  pagedItems: SearchResponseUser[];
  userResponseSubscription$: Subscription;
  appDataSubscription$: Subscription;

  constructor(private pagerService: PagerService, private store: Store<StoreRootObject>) {
  }

  ngOnChanges() {
  }

  ngOnDestroy(): void {
    this.userResponseSubscription$.unsubscribe();
    this.appDataSubscription$.unsubscribe();
  }

  ngOnInit() {
    this.appDataSubscription$ = this.store.pipe(select(selectorAppData))
      .subscribe(
        (data) => {
          this.usersPerPage = data.usersPerPage;
          this.currentPage = data.currentPage;
        },
        (error => {
          console.log(error);
        })
      );

    this.userResponseSubscription$ = this.store.pipe(select(selectorUsersResponse))
      .subscribe(
      (data) => {
        this.users = data;
        this.setPage(this.currentPage);
      },
      (error => {
        console.log(error);
      })
    );
  }

  changePage(page: number): void {
    this.store.dispatch(new AppDataActions.SetCurrentPage({currentPage: page}));
  }

  setPage(page: number): void {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.users.total_count, page, this.usersPerPage);

    // get current page of items
    this.pagedItems = this.users.items.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}
