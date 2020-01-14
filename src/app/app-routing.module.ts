import { NgModule } from '@angular/core';
import {Routes, RouterModule, RouteReuseStrategy} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SingleUserComponent} from './single-user/single-user.component';
import {CustomRouteReuseStategy} from './custom-route-reuse-strategy';

const routes: Routes = [
  {path: '', component: DashboardComponent, data: { shouldReuse: true }},
  {path: 'single-user/:username', component: SingleUserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: CustomRouteReuseStategy },
  ]
})
export class AppRoutingModule { }
