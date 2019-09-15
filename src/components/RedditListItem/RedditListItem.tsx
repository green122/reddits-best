import React, { memo } from "react";
import { IReddit } from "../../models/reddit.model";
import {
  RedditItemContainer,
  RedditTitle,
  MetaInfo,
  SubReddit,
  Points
} from "./RedditListItem.style";
import { redditLink } from "../../constants/api";

export function RedditListItem({ reddit }: { reddit: IReddit }) {
  return (
    <RedditItemContainer>
      <RedditTitle to={redditLink(reddit.permalink)} target="_blank" rel="noopener noreferrer">
        {reddit.title}{" "}
      </RedditTitle>
      <MetaInfo>
        <SubReddit to={`/details/${reddit.subRedditName}`}>
          {reddit.subReddit}
        </SubReddit>
        <Points>
          {reddit.points && reddit.points.toLocaleString("de")}
          <span className="points">points</span>
        </Points>
      </MetaInfo>
    </RedditItemContainer>
  );
}

export default memo(RedditListItem)