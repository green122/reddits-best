import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as BackIconSVG } from "../../assets/Back.svg";
import { BlueColor } from "../../constants/colors";

export const DetailsContainer = styled.div`
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
    margin-left: 16px;
    margin-top: 43px;
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
  color: #4583c2;
  text-decoration: none;
  @media (max-width: 600px) {
    margin-top: 0;
  }
`;

export const SubRedditHeader = styled.h2`
  font-weight: 900;
  font-size: 48px;
  line-height: 52px;
  color: #263d52;
  @media (max-width: 600px) {
    font-size: 42px;
    line-height: 47px;
  }
`;

export const SubHeader = styled.p`
  font-weight: bold;
  font-size: 26px;
  line-height: 31px;
  color: #8a95a5;
  margin: 8px 0 75px 0;
  @media (max-width: 600px) {
    font-size: 22px;
    line-height: 27px;
  }
`;

export const InfoKey = styled.h6`
  font-weight: bold;
  font-size: 26px;
  line-height: 35px;
  color: #263d52;
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
  color: #25496e;
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
`;

export const BackIcon = styled(BackIconSVG)`
  width: 8px;
  height: 16px;
  margin-right: 8px;
  fill: #4583c2;
`;

export const ErrorMessage = styled.div`
  color: red;
  margin: 100px auto;
  text-align: center;
`;

export const LoadingMessage = styled.div`
  color: ${BlueColor};
  margin: 200px auto;
  text-align: center;
`;