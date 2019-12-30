import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class DashboardService {
  configUrl = 'https://api.github.com/';

  constructor(private http: HttpClient) {
  }

  searchUsers(userName: string, usersPerPage: number, currentPage: number) {
    if (userName.length > 0) {
      return this.http
        .get(`${this.configUrl}search/users?q=${userName}&per_page=${usersPerPage}&page=${currentPage}`);
    } else {
      const $bSubject = new BehaviorSubject(null);
      $bSubject.next([]);
      return $bSubject;
    }
  }

  fetchUserRepos(username: string) {
    return this.http
      .get(`${this.configUrl}users/${username}/repos`);
  }

  fetchReposCommits(username: string, repo: string) {
    return this.http
      .get(`${this.configUrl}repos/${username}/${repo}/commits`);
  }
}
