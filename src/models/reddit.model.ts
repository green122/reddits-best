export enum ActionsTypes {
    REDDITS_FETCHING = "Reddits Fetching",
    REDDITS_FETCHED = "Reedits Fetched",
    REDDITS_ERROR = "Reddits Error",
    SUB_REDDIT_FETCHING = "Sub Reddit Fetching",
    SUB_REDDIT_FETCHED = "Sub Reddit Fetched",
    SUB_REDDIT_ERROR = "Sub Reddit Error",
  }
  
  export interface AnyAction {
    type: any;
    payload?: any;
  }

  export type FetchActions<T> = T[];
  export interface IAction  extends AnyAction {
    type: ActionsTypes;
    payload?: any;
  }
  
  export interface IReddit {
    title: string;
    id: string;
    subReddit: string;
    permalink: string;
    points: number;
    subRedditName: string;
  }

  export interface ISubReddit {
    title: string;
    description: string;
    subscribers: number;
    prefixedName: string;   
  }
  
  export interface RedditsState {
    reddits: any[];
    subReddits: {[key: string]: ISubReddit},
    isLoading: boolean;
    error: boolean;
  }
 
  export interface IRawReddit {
    title: string;
    permalink: string;
    id: string;
    score: number;
    subreddit_id: string;
    subreddit_name_prefixed: string;
    subreddit: string;
  }
  
  export interface IAPIResponse {
    [key: string]: string | number;
  }
  export interface IRedditsResponse {
    data: IRawReddit;
  }
  