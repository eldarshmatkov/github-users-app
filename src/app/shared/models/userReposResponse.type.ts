import {ReposResponse} from './reposResponse.type';

export interface UserReposResponse {
  user: string;
  items: ReposResponse[];
}

