import {Component, OnInit, Input, OnChanges, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})

export class TableViewComponent implements OnInit, OnChanges {
  @Input() users;
  @Output() isLoading = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnChanges() {
  }

  ngOnInit() {
  }
}
