import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { subRedditInfoUrl } from "../../constants/api";
import { fetchData } from "../../utils/fetchData";
import { ActionsTypes, ISubReddit } from "../../models/reddit.model";
import { useStoreSelector, useDispatch } from "../../hooks/useStore.hook";
import {
  ErrorMessage,
  LoadingMessage,
  DetailsContainer,
  BackToHome,
  BackIcon,
  SubRedditHeader,
  SubHeader,
  InfoBlock,
  InfoKey,
  InfoValue
} from "./RedditDetails.style";

const subRedditActions: ActionsTypes[] = [
  ActionsTypes.SUB_REDDIT_FETCHING,
  ActionsTypes.SUB_REDDIT_FETCHED,
  ActionsTypes.SUB_REDDIT_ERROR
];

export default function RedditDetails({
  match
}: RouteComponentProps<{ subRedditName: string }>) {
  const { subRedditName } = match.params;
  const isLoading: boolean = useStoreSelector(state => state.isLoading);
  const isError: boolean = useStoreSelector(state => state.error);
  const subReddit: ISubReddit = useStoreSelector(
    state => state.subReddits[subRedditName]
  );
  const dispatch = useDispatch();
  const isLoaded = Boolean(subReddit);
  useEffect(() => {
    if (isLoading || isLoaded || isError) {
      return;
    }
    return fetchData(
      async () => {
        const data = await fetch(subRedditInfoUrl(subRedditName));
        const parsed = await data.json();
        return parsed;
      },
      dispatch,
      subRedditActions
    );
  }, [dispatch, isLoaded, isLoading, isError, subRedditName]);

  const { title, prefixedName, description, subscribers } = subReddit || {};

  if (isError) {
    return <ErrorMessage>Oops... Network error!</ErrorMessage>;
  }
  if (isLoading) {
    return <LoadingMessage>...Loading...</LoadingMessage>;
  }
  if (!subReddit) {
    return null;
  }
  return (
    <DetailsContainer>
      <BackToHome to="/">
        <BackIcon />
        Home
      </BackToHome>
      <SubRedditHeader>
        {prefixedName}
        <SubHeader>Subreddit details</SubHeader>
      </SubRedditHeader>
      <InfoBlock>
        <InfoKey>Title</InfoKey>
        <InfoValue>{title}</InfoValue>
      </InfoBlock>
      <InfoBlock>
        <InfoKey>Public description</InfoKey>
        <InfoValue data-testid="descr">{description}</InfoValue>
      </InfoBlock>
      <InfoBlock>
        <InfoKey>Subscriber counter</InfoKey>
        <InfoValue>{subscribers && subscribers.toLocaleString("de")}</InfoValue>
      </InfoBlock>
    </DetailsContainer>
  );
}
