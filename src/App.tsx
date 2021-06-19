import { BrowserRouter as Router } from 'react-router-dom';

import GlobalStyle from './styles/globals';

import Routes from './routes';

import AppProvider from './hooks/AppProvider';

const App: React.FC = () => {
  return (
    <Router>
      <GlobalStyle />
      <AppProvider>
        <Routes />
      </AppProvider>
    </Router>
  );
};

export default App;
