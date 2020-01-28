import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CommitsResponse} from '../../../../../store/repos-commits/commitsResponse.type';

@Component({
  selector: 'app-commits-view',
  templateUrl: './commits-view.component.html',
  styleUrls: ['./commits-view.component.scss']
})
export class CommitsViewComponent implements OnInit, OnDestroy {
  @Input() commit: CommitsResponse;

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }
}
