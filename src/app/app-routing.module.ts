import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SingleUserComponent} from './single-user/single-user.component';
import {CanActivateRouteGuard} from './router/can-activate-route.guard';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {
    path: 'single-user/:username',
    component: SingleUserComponent,
    canActivate: [CanActivateRouteGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
