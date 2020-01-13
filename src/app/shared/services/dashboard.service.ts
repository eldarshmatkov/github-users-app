import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {searchResponse} from '../models/searchResponse.type';
import {reposResponse} from '../models/reposResponse.type';
import {commitsResponse} from '../models/commitsResponse.type';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class DashboardService {
  configUrl = 'https://api.github.com/';

  constructor(private http: HttpClient) {
  }

  searchUsers(userName: string, usersPerPage: number, currentPage: number): Observable<searchResponse> {
    if (userName.length > 0) {
      return this.http
        .get<searchResponse>(`${this.configUrl}search/users?q=${userName}&per_page=${usersPerPage}&page=${currentPage}`);
    } else {
      return new BehaviorSubject<searchResponse>({} as searchResponse);
    }
  }

  fetchUserRepos(username: string): Observable<reposResponse> {
    return this.http
      .get<reposResponse>(`${this.configUrl}users/${username}/repos`);
  }

  fetchReposCommits(username: string, repo: string): Observable<commitsResponse> {
    return this.http
      .get<commitsResponse>(`${this.configUrl}repos/${username}/${repo}/commits`);
  }
}
