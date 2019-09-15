import styled from "styled-components";
import { Blue700, Gray500 } from "../../constants/colors";

export const HomeTitle = styled.h1`
  font-style: normal;
  font-weight: 900;
  font-size: 42px;
  line-height: 46px;
  color: ${Blue700};
  margin: 80px 0 0 24px;
  @media (max-width: 600px) {
    margin: 48px 0 0 16px;
  }
`;

export const ErrorMessage = styled.div`
  color: red;
  margin: 100px auto;
  text-align: center;
`;

export const HomeSubTitle = styled.h3`
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 27px;
  color: ${Gray500};
  margin: 8px 0 38px 24px;
  @media (max-width: 600px) {
    margin: 8px 0 21px 16px;
  }
`;

export const ListContainer = styled.div`
  width: auto;
`;