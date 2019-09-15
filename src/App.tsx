import React, { useReducer, createContext } from "react";
import styled from 'styled-components';
import "./App.css";
import { get } from 'lodash';
import RedditsList from "./components/RedditsList/RedditsList";
import { BrowserRouter as Router, Route } from "react-router-dom";
import RedditDetails from "./components/RedditDetails/RedditDetails";
import {
  RedditsState,
  IReddit,
  IAction,
  ActionsTypes,
  ISubReddit
} from "./models/reddit.model";
const  Container = styled.div`
  width: 688px;
  margin: 0 auto 50px;
  @media (max-width: 600px) {
    width: 100vw;
  }
`;
const initialState: RedditsState = {
  reddits: [],
  isLoading: false,
  error: false,
  subReddits: {}
};

interface IRawReddit {
  title: string;
  permalink: string;
  id: string;
  score: number;
  subreddit_id: string;
  subreddit_name_prefixed: string;
  subreddit: string;
}

export function parseFetchedData(reddits: any[]): IReddit[] {
  return reddits.map(({ data = {} }) => {
    const {
      title,
      id,
      score: points,
      permalink,
      subreddit_id: subRedditId,
      subreddit: subRedditName,
      subreddit_name_prefixed: subReddit
    }: IRawReddit = data;
    return {
      subRedditId,
      subRedditName,
      title,
      id,
      permalink,
      points,
      subReddit
    };
  });
}

export function parseFetchedSubreddit(subReddit: {[key: string] : string | number}): ISubReddit {
  return {
    title: subReddit.title as string,
    description: subReddit.public_description as string,
    subscribers: subReddit.subscribers as number,
    prefixedName: subReddit.display_name_prefixed as string
  }
}

export const StateContext = createContext({
  state: initialState,
  dispatch: (() => ({})) as React.Dispatch<IAction>
});

export const reducer = (state: RedditsState, action: IAction) => {
  switch (action.type) {
    case ActionsTypes.REDDITS_FETCHING:
    case ActionsTypes.SUB_REDDIT_FETCHING:
      return { ...state, isLoading: true, error: false };
    case ActionsTypes.REDDITS_ERROR:
    case ActionsTypes.SUB_REDDIT_ERROR:
      return { ...state, isLoading: false, error: true };
    case ActionsTypes.REDDITS_FETCHED:      
      const parsedReddits = parseFetchedData(get(action, ['payload', 'data', 'children']));
      return { ...state, isLoading: false, error: false, reddits: parsedReddits };
    case ActionsTypes.SUB_REDDIT_FETCHED:
      const fetchedData = get(action, ['payload', 'data']);
      if (fetchedData) {
        const subReddit = parseFetchedSubreddit(fetchedData);
        return { ...state, isLoading: false, error: false, subReddits: { ...state.subReddits, [fetchedData.display_name]: subReddit} };
      }
      return state;
    default:
      return state;
  }
};

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      <Router>
        <Container>
          <Route path="/" exact component={RedditsList} />
          <Route
            path="/details/:subRedditName"
            exact
            component={RedditDetails}
          />
        </Container>
      </Router>
    </StateContext.Provider>
  );
};

export default App;
