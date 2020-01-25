import {CommitsResponse} from './commitsResponse.type';

export interface UserCommitsResponse {
  repo: string;
  items: CommitsResponse[];
}

