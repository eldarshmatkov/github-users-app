import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class DashboardService {
  configUrl = 'https://api.github.com/';
  searchUsersUrl = 'search/users?q=';
  usersUrl = 'users';
  since = '?since=';
  perPage = '&per_page=';

  constructor(private http: HttpClient) {
  }

  getUsers(sinceId = 0, usersPerPage = 5) {
    return this.http
      .get(`${this.configUrl}${this.usersUrl}${this.since}${sinceId}${this.perPage}${usersPerPage}`);
  }

  searchUsers(userName?: string) {
    return this.http
      .get(`${this.configUrl}${this.searchUsersUrl}${userName}`);
  }
}
