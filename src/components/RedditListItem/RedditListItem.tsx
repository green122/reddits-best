import React, { memo } from "react";

import { IReddit } from "../../models/reddit.model";
import {
  RedditItemContainer,
  RedditTitle,
  MetaInfo,
  SubReddit,
  Points
} from "./RedditListItem.style";

export function RedditListItem({ reddit }: { reddit: IReddit }) {
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

export default memo(RedditListItem)