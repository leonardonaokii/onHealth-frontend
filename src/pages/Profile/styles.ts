import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  min-height: 1250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  padding: 0 20px;
  min-width: 700px;
  width: 100%;
  max-width: 700px;
  height: 100vh;
  min-height: 1250px;

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1);

  .GenderRadioButton {
    display: flex;
    align-items: center;
    width: 80%;
    flex: 0 1 auto;
    margin: 8px 0;
    p {
      font-size: 16px;
      font-weight: 500;
    }
    span {
      font-size: 14px;
      font-weight: 500;
    }

    label {
      margin-left: 10px;
      span {
        padding: 0;
      }
    }
  }

  .dateContainer {
    margin: 0 0 15px 0;
    align-items: center;
    width: 80%;
    flex: 0 1 auto;
    display: flex;

    &-dateLabel {
      font-size: 16px;
      font-weight: 500;
      margin-right: 8px;
    }
  }

  header {
    position: absolute;

    a {
      padding: 5px;

      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#837fd3')};
      }

      svg {
        margin-top: 40px;
        margin-left: 40px;
        width: 35px;
        height: 35px;
      }
    }
  }

  form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: #ffffff;

    h1 {
      color: #0980ad;
      margin-bottom: 15px;
    }

    label {
      margin: 5px 0;
      background: #ffffff;
      input {
        margin-right: 5px;
      }
    }
  }

  button {
    margin-top: 15px;
    margin-bottom: 40px;
  }
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
`;

export const AvatarInput = styled.div`
  margin: 32px auto;
  position: relative;
  align-self: center;
  justify-self: center;

  img {
    width: 186px;
    height: 186px;
    border-radius: 50%;
  }

  div {
    width: 186px;
    height: 186px;
    border-radius: 50%;
  }

  label {
    position: absolute;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #b5f3fb;
    right: 0;
    bottom: 0;
    border: 0;
    transition: background-color 0.2s;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    input {
      display: none;
    }

    svg {
      width: 20px;
      height: 20px;
      color: #312e38;
    }

    &:hover {
      background: ${shade(0.2, '#b5f3fb')};
    }
  }
`;

export const NoAvatarContainer = styled.div`
  width: 186px;
  height: 186px;
  border-radius: 50%;
  background: #f0f2f5;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    color: #000000;
    font-size: 48px;
    font-weight: 600;
  }
`;
