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

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
  }

  expandRow() {
    this.isExpanded = !this.isExpanded;

    this.dashboardService.fetchReposCommits(this.userLogin, this.repos.name)
      .subscribe(
        data => {
          console.log(data, 'reposCommits');
          this.reposCommits = data;
        },
        err => console.error(err),
      );
  }
}
