import React, { useReducer, createContext } from "react";
import "./App.css";
import RedditsList from "./components/RedditsList/RedditsList";
import { BrowserRouter as Router, Route } from "react-router-dom";
import RedditDetails from "./components/RedditDetails/RedditDetails";
import { RedditsState, IReddit, IAction, ActionsTypes } from "./models/reddit.model";



const initialState: RedditsState = {
  reddits: [],
  isLoading: false,
  error: false
};

interface IRawReddit {
  title: string;
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
      subreddit_id: subRedditId,
      subreddit: subRedditName,
      subreddit_name_prefixed: subReddit
    }: IRawReddit  = data;
    return {
      subRedditId,
      subRedditName,
      title,
      id,
      points,
      subReddit
    };
  });
}

export const StateContext = createContext({
  state: initialState,
  dispatch: (() => ({})) as React.Dispatch<IAction>
});

const reducer = (state: RedditsState, action: IAction) => {
  switch (action.type) {
    case ActionsTypes.REDDITS_FETCHING:
      return { ...state, isLoading: true };
    case ActionsTypes.REDDITS_FETCHED:      
      const parsedReddits = parseFetchedData(action.payload.data.children);
      return { ...state, isLoading: false, reddits: parsedReddits };
    default:
      return state;
  }
};

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      <Router>
        <div className="App">
          <Route path="/" exact component={RedditsList} />
          <Route path="/details/:redditId" exact component={RedditDetails} />
        </div>
      </Router>
    </StateContext.Provider>
  );
};

export default App;
