import { FiPower } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import {
  Container,
  HeaderContent,
  HeaderOptions,
  NoAvatarContainer,
  Profile,
} from './styles';

import logoImg from '../../assets/logo.jpg';

const Header: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <Container>
      <HeaderContent>
        <Link to="/">
          <img src={logoImg} alt="OnHealth" />
        </Link>

        <Profile>
          {user.avatar_url && (
            <img src={user.avatar_url} alt={user.avatar_url} />
          )}
          {!user.avatar_url && (
            <NoAvatarContainer>
              <span>{`${user.first_name
                .charAt(0)
                .toUpperCase()}${user.last_name
                .charAt(0)
                .toUpperCase()}`}</span>
            </NoAvatarContainer>
          )}
          <div>
            <span>Bem-vindo,</span>
            <Link to="/profile">
              <strong>{`${user.first_name} ${user.last_name}`}</strong>
            </Link>
          </div>
        </Profile>

        <HeaderOptions>
          {user.type === 'user' && (
            <Link to="/create-appointment">Novo Agendamento</Link>
          )}
          <Link to="/history">Meu Histórico</Link>
        </HeaderOptions>

        <button type="button" onClick={signOut}>
          <FiPower />
        </button>
      </HeaderContent>
    </Container>
  );
};

export default Header;
