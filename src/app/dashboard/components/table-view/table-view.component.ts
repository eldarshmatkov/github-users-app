import {Component, OnInit, Input, OnChanges, Output, EventEmitter} from '@angular/core';
import {SearchResponseUser} from '../../../shared/models/searchResponseUser.type';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})

export class TableViewComponent implements OnInit, OnChanges {
  @Input() users: SearchResponseUser[];
  @Output() isLoading = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnChanges() {
  }

  ngOnInit() {
  }
}
