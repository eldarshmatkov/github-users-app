import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pagination-panel',
  templateUrl: './pagination-panel.component.html',
  styleUrls: ['./pagination-panel.component.scss']
})
export class PaginationPanelComponent implements OnInit, OnChanges {
  @Input() users;
  @Input() usersPerPage;
  @Input() paginationCurrentPage;
  @Output() paginationCurrentPageChange = new EventEmitter<number>();
  currentPage = 1;
  maximumPage: number;
  pagesArray = [];

  constructor() {
  }

  ngOnChanges() {
    if (this.users && this.users.total_count) {
      this.maximumPage = Math.ceil(this.users.total_count / this.usersPerPage);
      this.pagesArray = Array.from({length: this.maximumPage}, (v, k) => k + 1);
      console.log(this.pagesArray);
    }
    this.currentPage = this.paginationCurrentPage;
  }

  ngOnInit() {
  }

  selectPage(pageId) {
    this.currentPage = pageId;
    this.paginationCurrentPageChange.emit(this.currentPage);
  }

  nextPage() {
    if (this.currentPage !== this.maximumPage) {
      this.currentPage = ++this.currentPage;
      this.paginationCurrentPageChange.emit(this.currentPage);
    }
  }

  previousPage() {
    if (this.currentPage !== 1) {
      this.currentPage = --this.currentPage;
      this.paginationCurrentPageChange.emit(this.currentPage);
    }
  }

  firstPage() {
    this.currentPage = 1;
    this.paginationCurrentPageChange.emit(this.currentPage);
  }

  lastPage() {
    this.currentPage = this.maximumPage;
    this.paginationCurrentPageChange.emit(this.currentPage);
  }
}
