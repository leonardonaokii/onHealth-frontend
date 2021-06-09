import { lighten, shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div``;

export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 36px;
    margin-bottom: 40px;
  }
`;

export const Appointment = styled.div`
  a {
    display: flex;
    align-items: center;
    background: #837fd3;
    width: 500px;
    height: 100%;
    border-radius: 10px;
    padding: 10px 20px;
    text-decoration: none;

    img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      padding: 0;
      color: #000;
      font-size: 20px;
    }
  }

  > a {
    margin-bottom: 10px;
  }
`;

export const TimeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
  margin-left: auto;

  span {
    font-weight: 400;
    font-size: 16px;
    color: #f0f2f5;
    margin-left: 3px;
  }
  svg {
    color: #f0f2f5;
    height: 20px;
    width: 20px;
  }
`;
