import {Component, OnInit, Input, OnChanges, Output, EventEmitter} from '@angular/core';
import {searchResponseUser} from '../../../shared/models/searchResponseUser.type';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})

export class TableViewComponent implements OnInit, OnChanges {
  @Input() users: searchResponseUser[];
  @Output() isLoading = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnChanges() {
  }

  ngOnInit() {
  }
}
