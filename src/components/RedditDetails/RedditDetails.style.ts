import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as BackIconSVG } from "../../assets/Back.svg";
import { Blue400, Gray500, Blue700, Blue600 } from "../../constants/colors";

export const DetailsContainer = styled.div`
  font-family: Inter;
  margin-top: 64px;
  animation-name: appear;
  animation-duration: 0.4s;
  @keyframes appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @media (max-width: 600px) {
    margin: 43px 16px 16px 16px;
  }
`;

export const BackToHome = styled(Link)`
  font-family: Inter;
  font-style: normal;
  display: block;
  font-weight: bold;
  font-size: 22px;
  line-height: 27px;
  margin: 64px 0 24px 0;
  color: ${Blue400};
  text-decoration: none;
  @media (max-width: 600px) {
    margin-top: 0;
  }
`;

export const SubRedditHeader = styled.h2`
  word-break: break-all;
  font-weight: 900;
  font-size: 48px;
  line-height: 52px;
  color: ${Blue700};
  @media (max-width: 600px) {
    font-size: 42px;
    line-height: 47px;
  }
`;

export const SubHeader = styled.p`
  font-weight: bold;
  font-size: 26px;
  line-height: 31px;
  color: ${Gray500};
  margin: 8px 0 75px 0;
  @media (max-width: 600px) {
    font-size: 22px;
    line-height: 27px;
    margin-bottom: 49px;
  }
`;

export const InfoKey = styled.h6`
  font-weight: bold;
  font-size: 26px;
  line-height: 35px;
  color: ${Blue700};
  margin-bottom: 8px;
  @media (max-width: 600px) {
    font-size: 22px;
    line-height: 29px;
  }
`;

export const InfoValue = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 29px;
  color: ${Blue600} ;
  @media (max-width: 600px) {
    font-size: 18px;
    line-height: 26px;
  }
`;

export const InfoBlock = styled.section`
  &:not(:last-child) {
    margin-bottom: 44px;
  }
  transition: all 0.5s ease-out;
  @media (max-width: 600px) {
    margin-bottom: 35px;
  }
`;

export const BackIcon = styled(BackIconSVG)`
  width: 8px;
  height: 16px;
  margin-right: 8px;
  fill: ${Blue400};
`;

export const ErrorMessage = styled.div`
  color: red;
  margin: 100px auto;
  text-align: center;
`;

export const LoadingMessage = styled.div`
  color: ${Blue400};
  margin: 200px auto;
  text-align: center;
`;
