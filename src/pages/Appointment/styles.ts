import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  min-height: 100vh;
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
  min-height: 800px;

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1);

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
    margin-top: 32px;

    h1 {
      color: #0980ad;
      margin-bottom: 30px;
    }

    label {
      margin: 5px 0;
      background: #ffffff;
      input {
        margin-right: 5px;
      }
    }

    .info {
      display: flex;
      align-items: center;
      justify-content: center;
      border-top: solid 1px #000000;
      font-weight: 600;
      font-size: 16px;
      padding-top: 15px;
      width: 75%;
    }

    .status-info {
      font-weight: 600;
      font-size: 16px;
    }
  }

  .finish-appointment {
    margin-top: 15px;
    margin-bottom: 40px;
  }
`;

export const TextAreaContainer = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  margin-bottom: 10px;

  p {
    font-size: 18px;
    margin: 0 8px 0;
  }
`;

export const AppointmentDataContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  background: #f0f0f0;
  width: 80%;
  height: 120px;
  padding: 0 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1);

  img {
    width: 100px;
    height: 100px;
    margin-right: 5px;
  }

  div {
    display: flex;
    flex-direction: column;

    p {
      font-size: 16px;
      margin-bottom: 5px;
    }
  }
`;

export const DateContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
  width: 80%;
  justify-content: center;

  p {
    font-size: 16px;
    margin-bottom: 5px;
  }
`;

export const ChatModalButton = styled.button`
  background: #0060df;
  border: none;
  color: #f0f2f5;
  padding: 4px 8px;
  border-radius: 10px;
  font-size: 16px;
  margin-bottom: 15px;

  &:hover {
    background: ${shade(0.2, '#0060df')};
  }
`;

export const SymptomContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
  width: 80%;
  justify-content: center;

  p {
    font-size: 16px;
    margin-bottom: 0px;
    margin-right: 5px;
  }

  div {
    display: flex;
    align-items: center;
    padding: 3px 6px;
    background: #f0f2f5;
    margin-right: 5px;
    border-radius: 5px;
  }
`;

export const ScrollWrapper = styled.div`
  overflow-y: scroll;
  background: #ffffff;
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 1;
  position: relative;
  height: 470px;
  max-height: 470px;
  border-radius: 10px;
  padding: 5px 10px;

  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);

  > div + div {
    margin-top: 5px;
  }
`;

export const SendMessageForm = styled.form`
  display: flex;
  margin-top: 10px;
  align-items: center;

  input {
    border-radius: 8px 0 0 8px;
    padding: 6px 8px;
    width: 80%;
    border: none;
    height: 40px;
    margin-right: 3px;

    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  }

  button {
    border-radius: 0 8px 8px 0;
    padding: 8px 2px;
    width: 20%;
    background: #0060df;
    border: none;
    height: 40px;
    color: #b8f1f2;
    font-weight: 500;
    font-size: 16px;

    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  }
`;
