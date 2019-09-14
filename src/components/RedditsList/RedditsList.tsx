import React, { useContext, useEffect, Fragment } from "react";

import RedditListItem from "../RedditListItem/RedditListItem";
import { StateContext } from "../../App";

import { redditUrl } from "../../constants/api";
import { amountOfReddits } from "../../constants/common";
import { ActionsTypes } from "../../models/reddit.model";
import styled from "styled-components";

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
`;

const HomeSubTitle = styled.h3`
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 27px;
  color: #8a95a5;
  margin: 8px 0 38px 24px;
`;

const ListContainer = styled.div`
  width: auto;  
`;

export default function RedditsList() {
  const { state, dispatch } = useContext(StateContext);

  useEffect(() => {
    dispatch({ type: ActionsTypes.REDDITS_FETCHING });
    const fetchFunction = async () => {
      try {
        const data = await fetch(redditUrl(amountOfReddits));
        const parsed = await data.json();

        dispatch({ type: ActionsTypes.REDDITS_FETCHED, payload: parsed });
      } catch (error) {
        dispatch({ type: ActionsTypes.REDDITS_ERROR, payload: error });
      }
    };

    fetchFunction();
  }, [dispatch]);

  return (
    <Fragment>
      <HomeTitle>Home</HomeTitle>
      <HomeSubTitle>{`Top ${amountOfReddits} posts`}</HomeSubTitle>
      <ListContainer>
        {state.reddits.map(reddit => (
          <RedditListItem reddit={reddit} />
        ))}
      </ListContainer>
    </Fragment>
  );
}
