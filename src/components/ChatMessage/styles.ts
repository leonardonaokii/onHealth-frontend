import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const SentMessage = styled.div`
  margin-left: auto;
  display: flex;
  justify-content: end;
  padding: 5px 10px;
  background: #96f0f8;
  color: #303031;
  border-radius: 10px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);

  p {
    max-width: 300px;
    display: block;
    word-break: break-all;
    margin: 0;
  }
`;

export const ReceivedMessage = styled.div`
  display: flex;
  padding: 5px 10px;
  background: #f0f2f5;
  color: #303031;
  border-radius: 10px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);

  p {
    max-width: 300px;
    display: block;
    word-break: break-all;
    margin: 0;
  }
`;
