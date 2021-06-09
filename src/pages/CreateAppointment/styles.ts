import { shade } from 'polished';
import styled, { css } from 'styled-components';

interface SelectionButtonProps {
  selected: boolean;
}

export const Container = styled.div``;

export const Content = styled.div`
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

  .MuiAccordionDetails-root {
    justify-content: center;
  }

  .MuiTypography-root {
    font-size: 18px;
    font-weight: 400;
  }

  .buttonSubmit {
    color: #f0f2f5;
    padding: 10px 20px;
    text-decoration: none;
    margin-top: 20px;
    background: #837fd3;
    border-radius: 10px;
    width: 1120px;
    font-size: 18px;

    &:hover {
      background: ${shade(0.2, '#837fd3')};
    }
  }
`;

export const StepsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff;
  min-width: 900px;
  border-radius: 20px;

  h2 {
    margin: 15px 0;
  }

  p {
    margin-bottom: 5px;
  }

  button {
    margin-bottom: 5px;
  }
`;

export const DoctorProfileContainer = styled.div`
  display: flex;
  width: 1000px;
  overflow-x: scroll;
  white-space: pre;
  min-width: 100%;
`;

export const DoctorProfile = styled.button<SelectionButtonProps>`
  margin: 15px 5px 15px 0px;
  padding: 5px 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: none;
  border-radius: 10px;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  width: 300px !important;
  height: 120px;
  transition: background-color 0.3s ease;

  &:hover {
    background: ${shade(0.1, '#f0f0f0')};
  }

  ${props =>
    props.selected &&
    css`
      background: #c3c3c3;
    `}

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: #000000;
      font-size: 16px;
    }

    strong {
      text-decoration: none;
      font-size: 16px;
      color: #837fd3;
    }
  }
`;

export const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1000px;
`;

export const HourWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
`;

export const Hour = styled.button<SelectionButtonProps>`
  margin-right: 3px;
  padding: 3px 6px;
  border-radius: 3px;

  &:hover {
    background: ${shade(0.1, '#f0f0f0')};
  }

  ${props =>
    props.selected &&
    css`
      background: #c3c3c3;
    `}
`;
