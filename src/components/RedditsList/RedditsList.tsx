import React, { useContext, useEffect, Fragment } from "react";

import RedditListItem from "../RedditListItem/RedditListItem";
import { StateContext } from "../../App";
import { redditUrl } from "../../constants/api";
import { amountOfReddits } from "../../constants/common";
import { ActionsTypes, IReddit } from "../../models/reddit.model";
import { fetchData } from "../../utils/fetchData";
import { useStoreSelector } from "../../hooks/useStore.hook";
import { HomeTitle, HomeSubTitle, ListContainer } from "./RedditsList.style";
import { ErrorMessage } from "../RedditDetails/RedditDetails.style";

const redditsFetchActions = [
  ActionsTypes.REDDITS_FETCHING,
  ActionsTypes.REDDITS_FETCHED,
  ActionsTypes.REDDITS_ERROR
];

export default function RedditsList() {
  const { dispatch } = useContext(StateContext);
  const isError: boolean = useStoreSelector(state => state.error);
  const reddits: IReddit[] = useStoreSelector(state => state.reddits);

  useEffect(() => {
    fetchData(
      async () => {
        const data = await fetch(redditUrl(amountOfReddits));
        const parsed = await data.json();
        return parsed;
      },
      dispatch,
      redditsFetchActions
    );
  }, [dispatch]);

  return (
    <Fragment>
      <HomeTitle>Home</HomeTitle>
      <HomeSubTitle>{`Top ${amountOfReddits} posts`}</HomeSubTitle>
      {isError ? (
        <ErrorMessage>Oops... Network error!</ErrorMessage>
      ) : (
        <ListContainer>
          {reddits.map(reddit => (
            <RedditListItem key={reddit.id} reddit={reddit} />
          ))}
        </ListContainer>
      )}
    </Fragment>
  );
}
