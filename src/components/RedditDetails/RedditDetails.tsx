import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { StateContext } from "../../App";
import { subRedditInfoUrl } from "../../constants/api";
import { useFetch } from "../../hooks/fetch.hook";
import { ActionsTypes, ISubReddit } from "../../models/reddit.model";
import { ReactComponent as BackIconSVG } from "../../assets/Back.svg";
import { useStoreSelector, useDispatch } from "../../hooks/useStore.hook";

const subRedditActions: ActionsTypes[] = [
  ActionsTypes.SUB_REDDIT_FETCHING,
  ActionsTypes.SUB_REDDIT_FETCHED,
  ActionsTypes.SUB_REDDIT_ERROR
];

const BackToHome = styled(Link)`
  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 27px;
  color: #4583c2;
`;

const SubRedditHeader = styled.h2`
  font-weight: 900;
  font-size: 48px;
  line-height: 52px;
  color: #263d52;
`;

const SubHeader = styled.h5`
  font-weight: bold;
  font-size: 26px;
  line-height: 31px;
  color: #8a95a5;
`;

const InfoKey = styled.h6`
  font-weight: bold;
  font-size: 26px;
  line-height: 35px;
  color: #263d52;
`;

const InfoValue = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 29px;
  color: #25496e;
`;

const InfoBlock = styled.section`
  &:not(:last-child) {
    margin-bottom: 44px;
  }
`;

const BackIcon = styled(BackIconSVG)`
  fill: #4583c2;
`;

export default function RedditDetails(props: any) {
  const { subRedditName } = props.match.params;
  const isLoading: boolean = useStoreSelector(state => state.isLoading);
  const subReddit: ISubReddit = useStoreSelector(
    state => state.subReddits[subRedditName]
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoading || Boolean(subReddit)) {
      return;
    }

    let cancelled = false;
    dispatch({ type: ActionsTypes.SUB_REDDIT_FETCHING });
    const fetchFunction = async () => {
      try {
        const data = await fetch(subRedditInfoUrl(subRedditName));
        const parsed = await data.json();
        if (!cancelled) {
          dispatch({ type: ActionsTypes.SUB_REDDIT_FETCHED, payload: parsed });
        }
      } catch (error) {
        if (!cancelled) {
          dispatch({ type: ActionsTypes.SUB_REDDIT_ERROR, payload: error });
        }
      }
    };

    fetchFunction();
    return () => {
      cancelled = true;
    };
  }, [dispatch, subReddit]);

  const { title, prefixedName, description, subscribers } = subReddit || {};
  return (
    <div>
      <BackToHome to="/">
        <BackIcon />
        Home
      </BackToHome>
      <SubRedditHeader>
        {prefixedName}
        <SubHeader>
          Subreddit details
        </SubHeader>
        </SubRedditHeader>
      <InfoBlock>
        <InfoKey>Title</InfoKey>
        <InfoValue>{title}</InfoValue>
      </InfoBlock>
      <InfoBlock>
        <InfoKey>Public description</InfoKey>
        <InfoValue>{description}</InfoValue>
      </InfoBlock>
      <InfoBlock>
        <InfoKey>Subscriber counter</InfoKey>
        <InfoValue>{subscribers}</InfoValue>
      </InfoBlock>
    </div>
  );
}
