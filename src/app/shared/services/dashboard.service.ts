import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {SearchResponse} from '../models/searchResponse.type';
import {ReposResponse} from '../models/reposResponse.type';
import {CommitsResponse} from '../models/commitsResponse.type';
import {AppData} from '../models/app-data.type';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class DashboardService {
  configUrl = 'https://api.github.com/';

  constructor(private http: HttpClient) {
  }

  searchUsers(appData: AppData): Observable<SearchResponse> {
    if (appData.searchField.length > 0) {
      return this.http
        .get<SearchResponse>(`${this.configUrl}search/users?q=${appData.searchField}&per_page=${appData.usersPerPage}&page=${appData.currentPage}`);
    } else {
      return new BehaviorSubject<SearchResponse>({} as SearchResponse);
    }
  }

  fetchUserRepos(username: string): Observable<ReposResponse> {
    return this.http
      .get<ReposResponse>(`${this.configUrl}users/${username}/repos`);
  }

  fetchReposCommits(username: string, repo: string): Observable<CommitsResponse> {
    return this.http
      .get<CommitsResponse>(`${this.configUrl}repos/${username}/${repo}/commits`);
  }
}
