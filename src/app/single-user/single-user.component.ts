import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {SearchResponseUser} from '../shared/models/searchResponseUser.type';
import {StatePass} from '../shared/models/statePass.type';

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.scss']
})
export class SingleUserComponent implements OnInit {
  state$: Observable<StatePass>;
  userData: SearchResponseUser;

  constructor(public activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.state$ = this.activatedRoute.paramMap
      .pipe(map(() => window.history.state));
    this.state$
      .subscribe((data) => {
        // if no user data passed, then go to main screen
        if (!data.userData) {
          this.goToMain();
        }
        this.userData = data.userData;
      });
  }
  goToMain() {
    this.router.navigate(['']);
  }
}
