import {Component, Input, OnInit} from '@angular/core';
import {CommitsResponse} from '../../../../../shared/models/commitsResponse.type';

@Component({
  selector: 'app-commits-view',
  templateUrl: './commits-view.component.html',
  styleUrls: ['./commits-view.component.scss']
})
export class CommitsViewComponent implements OnInit {
  @Input() commit: CommitsResponse;

  constructor() { }

  ngOnInit() {
  }
}
