import { Switch } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Appointment from '../pages/Appointment';
import History from '../pages/History';
import CreateAppointment from '../pages/CreateAppointment';
import Profile from '../pages/Profile';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Route from './Route';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/profile" component={Profile} isPrivate />
    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/create-appointment" component={CreateAppointment} isPrivate />
    <Route path="/appointment" component={Appointment} isPrivate />
    <Route path="/history" component={History} isPrivate />
  </Switch>
);
export default Routes;
