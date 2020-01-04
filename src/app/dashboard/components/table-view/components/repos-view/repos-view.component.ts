import {Component, Input, OnInit} from '@angular/core';
import {DashboardService} from '../../../../../shared/services/dashboard.service';

@Component({
  selector: 'app-repos-view',
  templateUrl: './repos-view.component.html',
  styleUrls: ['./repos-view.component.scss']
})
export class ReposViewComponent implements OnInit {
  @Input() isExpanded;
  @Input() repos;
  @Input() userLogin;
  reposCommits: any;
  commitsExpanded = false;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
  }

  expandRow() {
    if (!this.commitsExpanded) {
      this.dashboardService.fetchReposCommits(this.userLogin, this.repos.name)
        .subscribe(
          data => {
            this.reposCommits = data;
          },
          err => console.error(err),
        );
    }
    this.commitsExpanded = !this.commitsExpanded;
  }
}
