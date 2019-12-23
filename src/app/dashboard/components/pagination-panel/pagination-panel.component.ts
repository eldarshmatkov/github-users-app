import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination-panel',
  templateUrl: './pagination-panel.component.html',
  styleUrls: ['./pagination-panel.component.scss']
})
export class PaginationPanelComponent implements OnInit {
  meals: string[] = ['eda', 'eshe eda', 'ieshe', 'eda', 'eshe eda', 'ieshe', 'eda', 'eshe eda', 'ieshe', 'eda', 'eshe eda', 'ieshe', 'eda', 'eshe eda', 'ieshe', 'eda', 'eshe eda', 'ieshe', 'eda', 'eshe eda', 'ieshe', 'eda', 'eshe eda', 'ieshe', 'eda', 'eshe eda', 'ieshe', 'eda', 'eshe eda', 'ieshe', 'eda', 'eshe eda', 'ieshe', 'eda', 'eshe eda', 'ieshe'];
  page = 1;

  constructor() { }

  ngOnInit() {
  }

}
