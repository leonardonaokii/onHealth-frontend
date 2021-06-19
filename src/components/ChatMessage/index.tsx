import { Avatar } from '@material-ui/core';
import { HTMLAttributes } from 'react';
import { Container, SentMessage, ReceivedMessage } from './styles';

interface Message {
  uid: string;
  text: string;
}

interface ChatMessageProps extends HTMLAttributes<HTMLDivElement> {
  user_id: string;
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ user_id, message }) => {
  const { text, uid } = message;

  const messageType = user_id === uid ? 'sent' : 'received';

  return (
    <Container>
      {messageType === 'sent' ? (
        <SentMessage>
          <p>{text}</p>
        </SentMessage>
      ) : (
        <ReceivedMessage>
          <p>{text}</p>
        </ReceivedMessage>
      )}
    </Container>
  );
};

export default ChatMessage;
