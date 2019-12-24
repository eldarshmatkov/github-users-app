import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class DashboardService {
  configUrl = 'https://api.github.com/';
  users = 'users?since=';

  constructor(private http: HttpClient) {
  }

  getUsers(usersId= 0) {
    return this.http.get(`${this.configUrl}${this.users}${usersId}`);
  }
}
