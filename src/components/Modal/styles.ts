import styled from 'styled-components';
import { FiX } from 'react-icons/fi';

export const Container = styled.div`
  width: 100%;
  height: 1100px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  background: rgba(0, 0, 0, 0.8);
`;

export const Content = styled.div`
  display: flex;
  background: #f0f2f5;
  width: 400px;
  height: 600px;
  border-radius: 10px;
  padding: 10px;
  flex-direction: column;
`;

export const CloseModalButton = styled(FiX)`
  cursor: pointer;
  width: 20px;
  height: 20px;
  margin-left: auto;
`;

export const ModalHeader = styled.header`
  display: flex;
  margin-bottom: 15px;
  align-items: center;
`;

export const Title = styled.strong`
  font-size: 20px;
  margin: 0 auto;
`;

export const ScrollWrapper = styled.div`
  overflow-y: scroll;
  background: #f0f2f5;
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 1;

  button {
    width: 200px;
    padding: 3px 6px;
    border-radius: 8px;
    border: none;
    background: #0060df;
    color: #f0f2f5;
    font-size: 18px;
    margin-bottom: 5px;
  }
`;
