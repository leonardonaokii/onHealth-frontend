import { Avatar } from '@material-ui/core';
import { Dispatch, HTMLAttributes, SetStateAction } from 'react';
import {
  CloseModalButton,
  Container,
  Content,
  Profile,
  ModalHeader,
} from './styles';

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  name: string;
  image: string;
}

const ChatModal: React.FC<ModalProps> = ({
  showModal,
  setShowModal,
  children,
  name,
  image,
  ...rest
}) => {
  return (
    <>
      {showModal ? (
        <>
          <Container
            className="closeModalArea"
            onClick={() => setShowModal(false)}
          />
          {/* <Container> */}
          <Content>
            <ModalHeader>
              <Profile>
                <Avatar style={{ marginRight: '5px' }} src={image} alt={name} />
                <strong>{name}</strong>
              </Profile>
              <CloseModalButton onClick={() => setShowModal(!showModal)} />
            </ModalHeader>
            {children}
          </Content>
          {/* </Container> */}
        </>
      ) : null}
    </>
  );
};

export default ChatModal;
