import styled from 'styled-components';
import { FiX } from 'react-icons/fi';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  background: rgba(0, 0, 0, 0.8);

  .closeModalArea {
    width: 100%;
    height: 100%;
    position: absolute;
  }
`;

export const Content = styled.div`
  display: flex;
  background: #f0f2f5;
  width: 450px;
  height: 600px;
  border-radius: 10px;
  padding: 10px;
  flex-direction: column;
  position: absolute;
`;

export const CloseModalButton = styled(FiX)`
  cursor: pointer;
  width: 30px;
  height: 30px;
  margin-left: auto;
`;

export const ModalHeader = styled.header`
  display: flex;
  margin-bottom: 15px;
  align-items: center;
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;

  strong {
    font-size: 20px;
    margin: 0 auto;
  }
`;
