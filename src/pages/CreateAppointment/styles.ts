import styled from 'styled-components';

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

export const DoctorProfile = styled.button`
  margin: 15px 0;
  padding: 5px 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: none;
  border-radius: 10px;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  width: 300px;
  height: 120px;

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
