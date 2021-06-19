import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1100px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  background: #ffffff;
  border-radius: 30px;

  margin: 10px 0;
  padding: 0 20px;

  min-width: 700px;
  width: 100%;
  max-width: 700px;
  max-height: 1100px;
  min-height: 1100px;

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1);

  form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: #ffffff;

    label {
      margin: 15px 0;
      background: #ffffff;
      input {
        margin-right: 5px;
      }
    }

    .specialty-wrapper {
      display: flex;
      width: 80%;
      flex: 1;
      align-items: center;
      margin: 15px 0 25px 0px;

      span {
        font-size: 16px;
        margin-right: 8px;
        margin-top: 0;
      }

      .medical-specialty-button {
        background: #0060df;
        border: none;
        color: #f0f2f5;
        padding: 4px 8px;
        border-radius: 10px;
        font-size: 16px;
        margin: 0;
      }
    }
  }

  img {
    width: 500px;

    margin-top: 40px;
    margin-bottom: 20px;
    place-self: center;
  }

  button {
    margin-top: 15px;
    margin-bottom: 40px;
  }

  a {
    color: #837fd3;
    background: #ffffff;
    font-size: 16px;
    display: block;
    margin-bottom: 24px;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      color: ${shade(0.2, '#837fd3')};
    }

    svg {
      margin-right: 16px;
    }
  }

  .dropdown {
    button {
      margin: 0px 0px 5px 0px;
    }
  }
`;
