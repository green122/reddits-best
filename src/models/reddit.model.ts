export enum ActionsTypes {
    REDDITS_FETCHING = "Reddits Fetching",
    REDDITS_FETCHED = "Reedits Fetched",
    REDDITS_ERROR = "Reddits Error",
    SUB_REDDIT_FETCHING = "Sub Reddit Fetching",
    SUB_REDDIT_FETCHED = "Sub Reddit Fetched",
    SUB_REDDIT_ERROR = "Sub Reddit Error",
  }
  
  export interface IAction {
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