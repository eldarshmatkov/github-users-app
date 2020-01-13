import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {PagerService} from '../../../shared/services/pager.service';
import {searchResponseUser} from '../../../shared/models/searchResponseUser.type';
import {pagerType} from '../../../shared/models/pager.type';
import {Store} from '@ngrx/store';
import {searchResponse} from '../../../shared/models/searchResponse.type';

@Component({
  selector: 'app-pagination-panel',
  templateUrl: './pagination-panel.component.html',
  styleUrls: ['./pagination-panel.component.scss']
})
export class PaginationPanelComponent implements OnInit, OnChanges {
  users: searchResponse;
  @Input() usersPerPage: number;
  @Input() shouldShow: boolean;
  pager: pagerType;
  pagedItems: searchResponseUser[];
  @Output() changePageEmitter = new EventEmitter<number>();

  constructor(private pagerService: PagerService, private store: Store<{ usersResponse: searchResponse}>) {
  }

  ngOnChanges() {
  }

  ngOnInit() {
    this.store.select('usersResponse').subscribe(
      (data) => {
        this.users = data;
      },
      (error => {
        console.log(error); })
    );
  }

  changePage(page: number): void {
    this.changePageEmitter.emit(page);
  }

  setPage(page: number): void {
      // get pager object from service
      this.pager = this.pagerService.getPager(this.users.total_count, page, this.usersPerPage);

      // get current page of items
      this.pagedItems = this.users.items.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}
