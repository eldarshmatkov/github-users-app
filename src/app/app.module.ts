import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DashboardModule} from './dashboard/dashboard.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SingleUserComponent } from './single-user/single-user.component';
import {StoreModule} from '@ngrx/store';
import {usersReducer} from './store/users/users.reducer';
import {appDataReducer} from './store/app-data/app-data.reducer';

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
    StoreModule.forRoot({usersResponse: usersReducer, appData: appDataReducer}),
    HttpClientModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
