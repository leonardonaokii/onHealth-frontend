import { Dispatch, HTMLAttributes, SetStateAction } from 'react';
import {
  CloseModalButton,
  Container,
  ScrollWrapper,
  Content,
  Title,
  ModalHeader,
} from './styles';

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  title: string;
}

const Modal: React.FC<ModalProps> = ({
  showModal,
  setShowModal,
  children,
  title,
  ...rest
}) => {
  return (
    <>
      {showModal ? (
        <Container>
          <Content>
            <CloseModalButton onClick={() => setShowModal(!showModal)} />
            <ModalHeader>
              <Title>{title}</Title>
            </ModalHeader>
            <ScrollWrapper>{children}</ScrollWrapper>
          </Content>
        </Container>
      ) : null}
    </>
  );
};

export default Modal;
