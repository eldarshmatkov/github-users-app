import {Component, OnInit, Input, OnChanges} from '@angular/core';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})

export class TableViewComponent implements OnInit, OnChanges {
  @Input() users;

  constructor() {
  }

  ngOnChanges() {
  }

  ngOnInit() {
  }
}
