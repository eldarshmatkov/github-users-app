import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {PagerService} from '../../../shared/services/pager.service';

@Component({
  selector: 'app-pagination-panel',
  templateUrl: './pagination-panel.component.html',
  styleUrls: ['./pagination-panel.component.scss']
})
export class PaginationPanelComponent implements OnInit, OnChanges {
  users;
  @Input() usersPerPage;
  @Input() shouldShow;
  pager: any = {};
  pagedItems: any[];
  @Output() changePageEmitter = new EventEmitter<number>();

  constructor(private pagerService: PagerService) {
  }

  ngOnChanges() {
  }

  ngOnInit() {
  }

  changePage(page: number) {
    this.changePageEmitter.emit(page);
  }

  setPage(page: number) {
      // get pager object from service
      this.pager = this.pagerService.getPager(this.users.total_count, page, this.usersPerPage);

      // get current page of items
      this.pagedItems = this.users.items.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}
