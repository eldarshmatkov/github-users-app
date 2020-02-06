import {ReposResponse} from './reposResponse.type';

export interface UserReposResponse {
  isLoaded: boolean;
  items: ReposResponse[];
}

