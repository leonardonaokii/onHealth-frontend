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

export const DoctorProfile = styled.div`
  margin: 15px 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

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
