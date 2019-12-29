import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterSearchComponent } from './components/filter-search/filter-search.component';
import { ShowRecordsComponent } from './components/show-records/show-records.component';
import { TableViewComponent } from './components/table-view/table-view.component';
import { PaginationPanelComponent } from './components/pagination-panel/pagination-panel.component';
import { DashboardComponent } from './dashboard.component';
import {FormsModule} from '@angular/forms';
import { ReposViewComponent } from './components/table-view/components/repos-view/repos-view.component';
import { TableRowComponent } from './components/table-view/components/table-row/table-row.component';
import { CommitsViewComponent } from './components/table-view/components/commits-view/commits-view.component';

@NgModule({
  declarations: [FilterSearchComponent, ShowRecordsComponent, TableViewComponent, PaginationPanelComponent, DashboardComponent, ReposViewComponent, TableRowComponent, CommitsViewComponent, ],
  imports: [
    CommonModule,
    FormsModule,
  ]
})
export class DashboardModule { }
