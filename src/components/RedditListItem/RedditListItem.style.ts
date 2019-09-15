import styled from "styled-components";
import { Link } from "react-router-dom";
import { Blue700, Blue400 } from "../../constants/colors";

export const RedditItemContainer = styled.div`
  width: auto;
  background: white;
  border: 1px solid #e2e7eb;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 25px;
  text-align: left;
  animation-duration: 0.4s;
  animation-name: appear;
  @keyframes appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  &:not(:last-child) {
    margin-bottom: 24px;
    @media (max-width: 600px) {
      margin-bottom: 1px;
    }
  }
`;

export const RedditTitle = styled(Link)`
  margin: 0;
  font-size: 24px;
  font-weight: bold;
  display: block;
  color: ${Blue700};
  text-decoration: none;
  word-break: break-word;
  text-align: left;
  @media (max-width: 600px) {
    font-size: 20px;
    line-height: 27px;
  }
`;

export const MetaInfo = styled.section`
  width: auto;
  display: inline-block;
  margin-top: 12px;
  font-size: 18px;
  line-height: 22px;  
  @media (max-width: 600px) {
    font-size: 16px;
    line-height: 19px;
  }
`;

export const SubReddit = styled(Link)`
  color: ${Blue400};
  font-family: Inter;
  text-decoration: none;
  font-style: normal;
  font-weight: bold;
`;

export const Points = styled.span`
  font-family: Inter;
  color: #8a95a5;
  display: inline-block;
  font-style: normal;
  font-weight: bold;
  position: relative;
  margin-left: 15px;
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
    height: 3px;
    width: 3px;
    background-color: #8a95a5;
  }
`;
