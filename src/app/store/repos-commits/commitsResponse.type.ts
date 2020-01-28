import {SearchResponseUser} from '../users/searchResponseUser.type';

export interface CommitsResponse {
  sha: string;
  node_id: string;
  commit: any;
  url: string;
  html_url: string;
  comments_url: string;
  author: SearchResponseUser;
  committer: SearchResponseUser;
  parents: any [];
}
