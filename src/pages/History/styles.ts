import { lighten, shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div``;

export const Header = styled.header`
  padding: 32px;
  background: #ffffff;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  a {
    margin-left: 8px;
    > img {
      height: 60px;
    }
  }

  button {
    background: transparent;
    border: 0;

    svg {
      color: #999591;
      width: 20px;
      height: 20px;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: #000000;
    }

    a {
      text-decoration: none;
      color: #837fd3;

      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

export const NoAvatarContainer = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #f0f2f5;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    color: #000000;
    font-size: 18px;
    font-weight: 600;
  }
`;

export const HeaderOptions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 34px;
  margin-left: auto;
  margin-right: 30px;

  a {
    color: #f0f2f5;
    padding: 10px 20px;
    text-decoration: none;
    margin-left: 20px;
    background: #837fd3;
    border-radius: 10px;

    &:hover {
      background: ${shade(0.2, '#837fd3')};
    }
    &:hover {
      color: ${lighten(0.2, '#f0f2f5')};
    }
  }
`;

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
