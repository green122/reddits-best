import React, { useContext } from "react";

import RedditListItem from "../RedditListItem/RedditListItem";
import { StateContext } from "../../App";
import { useFetch } from "../../hooks/fetch.hook";
import { redditUrl } from "../../constants/api";
import { amountOfReddits } from "../../constants/common";
import { ActionsTypes } from "../../models/reddit.model";

const redditsFetchActions = [
  ActionsTypes.REDDITS_FETCHING,
  ActionsTypes.REDDITS_FETCHED,
  ActionsTypes.REDDITS_ERROR
];
export default function RedditsList() {
  const { state, dispatch } = useContext(StateContext);
  useFetch(redditUrl(amountOfReddits), dispatch, redditsFetchActions);
  return (
    <div>
      {state.reddits.map(reddit => (
        <RedditListItem reddit={reddit} />
      ))}
    </div>
  );
}
