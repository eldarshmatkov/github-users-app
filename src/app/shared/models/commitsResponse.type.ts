import {searchResponseUser} from './searchResponseUser.type';

export type commitsResponse = {
  sha: string;
  node_id: string;
  commit: any;
  url: string;
  html_url: string;
  comments_url: string;
  author: searchResponseUser;
  committer: searchResponseUser;
  parents: any [];
};
