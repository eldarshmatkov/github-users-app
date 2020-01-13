import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {commitsResponse} from '../../../../../shared/models/commitsResponse.type';

@Component({
  selector: 'app-commits-view',
  templateUrl: './commits-view.component.html',
  styleUrls: ['./commits-view.component.scss']
})
export class CommitsViewComponent implements OnInit {
  @Input() commit: commitsResponse;

  constructor() { }

  ngOnInit() {
  }
}
