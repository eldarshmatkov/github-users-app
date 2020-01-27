import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DashboardModule} from './dashboard/dashboard.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SingleUserComponent} from './single-user/single-user.component';
import {StoreModule} from '@ngrx/store';
import {reducers} from './store/storeRootObject';
import {EffectsModule} from '@ngrx/effects';
import {UsersEffects} from './store/users/users.effects';
import {environment} from '../environments/environment.prod';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {UsersReposEffects} from './store/users-repos/users-repos.effects';
import {ReposCommitsEffects} from './store/repos-commits/repos-commits.effects';
import {CanActivateRouteGuard} from './router/can-activate-route.guard';

@NgModule({
  declarations: [
    AppComponent,
    SingleUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    NoopAnimationsModule,
    StoreModule.forRoot(reducers),
    HttpClientModule,
    NgbModule,
    EffectsModule.forRoot([UsersEffects, UsersReposEffects, ReposCommitsEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [CanActivateRouteGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
