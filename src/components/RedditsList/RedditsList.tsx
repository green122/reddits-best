import React, { useContext, useEffect, Fragment } from "react";

import RedditListItem from "../RedditListItem/RedditListItem";
import { StateContext } from "../../App";

import { redditUrl } from "../../constants/api";
import { amountOfReddits } from "../../constants/common";
import { ActionsTypes, IReddit } from "../../models/reddit.model";
import styled from "styled-components";
import { fetchData } from "../../utils/fetchData";
import { useStoreSelector } from "../../hooks/useStore.hook";

const redditsFetchActions = [
  ActionsTypes.REDDITS_FETCHING,
  ActionsTypes.REDDITS_FETCHED,
  ActionsTypes.REDDITS_ERROR
];

const HomeTitle = styled.h1`
  font-style: normal;
  font-weight: 900;
  font-size: 42px;
  line-height: 46px;
  color: #263d52;
  margin: 80px 0 0 24px;
  @media (max-width: 600px) {
    margin: 48px 0 0 16px;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin: 100px auto;
  text-align: center;
`;

const HomeSubTitle = styled.h3`
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 27px;
  color: #8a95a5;
  margin: 8px 0 38px 24px;
  @media (max-width: 600px) {
    margin: 8px 0 21px 16px;
  }
`;

const ListContainer = styled.div`
  width: auto;
`;

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
