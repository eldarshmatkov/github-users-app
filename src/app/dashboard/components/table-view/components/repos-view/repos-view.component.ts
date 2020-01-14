import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DashboardService} from '../../../../../shared/services/dashboard.service';
import {ReposResponse} from '../../../../../shared/models/reposResponse.type';
import {CommitsResponse} from '../../../../../shared/models/commitsResponse.type';

@Component({
  selector: 'app-repos-view',
  templateUrl: './repos-view.component.html',
  styleUrls: ['./repos-view.component.scss']
})
export class ReposViewComponent implements OnInit {
  @Input() isExpanded: boolean;
  @Input() repos: ReposResponse;
  @Input() userLogin: string;
  reposCommits: CommitsResponse;
  commitsExpanded = false;
  @Output() isLoading = new EventEmitter<boolean>();

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
  }

  expandRow() {
    if (!this.commitsExpanded) {
      this.isLoading.emit(true);
      this.dashboardService.fetchReposCommits(this.userLogin, this.repos.name)
        .subscribe(
          data => {
            this.reposCommits = data;
          },
          err => this.isLoading.emit(false),
          () => {
            this.isLoading.emit(false);
          }
        );
    }
    this.commitsExpanded = !this.commitsExpanded;
  }
}
