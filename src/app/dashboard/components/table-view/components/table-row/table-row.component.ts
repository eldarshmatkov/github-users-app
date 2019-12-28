import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.scss']
})
export class TableRowComponent implements OnInit {
  @Input() user;
  isExpanded = false;

  constructor() {
  }

  ngOnInit() {
  }

  expandRow() {
    this.isExpanded = !this.isExpanded;
    console.log('expand!');
  }

}
