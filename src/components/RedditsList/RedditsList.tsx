import React, { Fragment } from "react";
import RedditListItem from "../RedditListItem/RedditListItem";

import { amountOfReddits } from "../../constants/common";
import { IReddit } from "../../models/reddit.model";
import { HomeTitle, HomeSubTitle, ListContainer } from "./RedditsList.style";
import { ErrorMessage } from "../RedditDetails/RedditDetails.style";

import { injectService } from "../../HOC/injectService";
import { useFetchRedditsList } from "./RedditsList.service";

export function RedditsList({
  useFetchRedditsList
}: {
  useFetchRedditsList: () => { isError: boolean; reddits: IReddit[], refetch: () => void };
}) {
  const { isError, reddits, refetch } = useFetchRedditsList();
  return (
    <Fragment>
      <HomeTitle>Home</HomeTitle> 
      <button onClick={refetch}>Click me</button>     
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

export default injectService({ useFetchRedditsList })(RedditsList);
