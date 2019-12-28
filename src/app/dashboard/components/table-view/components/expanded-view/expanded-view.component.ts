import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-expanded-view',
  templateUrl: './expanded-view.component.html',
  styleUrls: ['./expanded-view.component.scss']
})
export class ExpandedViewComponent implements OnInit {
  @Input() isExpanded;

  constructor() { }

  ngOnInit() {
  }
  expandRow() {
    this.isExpanded = !this.isExpanded;
  }
}
