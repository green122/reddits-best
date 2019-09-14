import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { IReddit } from "../../models/reddit.model";


const RedditItemContainer = styled.div`
  width: 688px;
  background: #ffffff;
  border: 1px solid #e2e7eb;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 25px;
  text-align: left;
  &:not(:last-child) {
    margin-bottom: 24px;
  }
`;

const RedditTitle = styled(Link)`
  margin: 0;
  font-size: 24px;
  font-weight: bold;
  display: block;
  color: #263d52;
  text-decoration: none;
  word-break: break-word;
  text-align: left;
`;

const MetaInfo = styled.section`
  width: auto;
  display: inline-block;
  margin-top: 12px;
`;

const SubReddit = styled(Link)`
  color: #4583c2;
  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
`;

const Points = styled.span`
  font-family: Inter;
  color: #8a95a5;
  display: inline-block;
  font-style: normal;
  font-weight: bold;
  position: relative;
  margin-left: 15px;
  font-size: 18px;
  line-height: 22px;
  .points {
    margin-left: 5px;
    font-weight: normal;
  }
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: -9px;
    -webkit-border-radius: 0.375rem;
    border-radius: 50%;
    height: 5px;
    width: 5px;
    background-color: #000000;
  }
`;

export default function RedditListItem({ reddit }: { reddit: IReddit }) {
  const redditLink = `//www.reddit.com${reddit.permalink}`;

  return (
    <RedditItemContainer>
      <RedditTitle to={redditLink} target="_blank" rel="noopener noreferrer">
        {reddit.title}{" "}
      </RedditTitle>
      <MetaInfo>
        <SubReddit to={`/details/${reddit.subRedditName}`}>
          {reddit.subReddit}
        </SubReddit>
        <Points>
          {reddit.points.toLocaleString("de")}
          <span className="points">points</span>
        </Points>
      </MetaInfo>
    </RedditItemContainer>
  );
}
