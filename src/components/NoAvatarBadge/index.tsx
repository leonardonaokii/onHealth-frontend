import { HTMLAttributes } from 'react';
import { useAuth } from '../../hooks/auth';
import { NoAvatarContainer } from './styles';

interface NoAvatar extends HTMLAttributes<HTMLDivElement> {
  fontSize: number;
  containerSize: number;
}

const NoAvatarBadge: React.FC<NoAvatar> = ({
  fontSize,
  containerSize,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <NoAvatarContainer style={{ width: containerSize, height: containerSize }}>
      <span style={{ fontSize }}>{`${user.first_name
        .charAt(0)
        .toUpperCase()}${user.last_name.charAt(0).toUpperCase()}`}</span>
    </NoAvatarContainer>
  );
};
