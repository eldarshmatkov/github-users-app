import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class DashboardService {
  configUrl = 'https://api.github.com/';
  searchUsersUrl = 'search/users?q=';
  perPage = '&per_page=';

  constructor(private http: HttpClient) {
  }

  searchUsers(userName?: string, usersPerPage?: number) {
    if (userName.length > 0) {
      return this.http
        .get(`${this.configUrl}search/users?q=${userName}&per_page=${usersPerPage}`);
    } else {
      return this.http
        .get(`${this.configUrl}users?per_page=${usersPerPage}`)
        .pipe(
          map( response => {
            return {items: response};
          })
        );
    }

  }
}
