import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './index.scss';

import Navbar from 'components/Navbar';
import Home from 'pages/Home';
import SignIn from 'pages/SignIn';
import SignUp from 'pages/SignUp';
import Formations from 'pages/Formations';
import Formation from 'pages/Formation';
import Users from 'pages/Users';
import AddCategory from 'pages/AddCategory';
import Inscription from 'pages/Inscription';
import Sessions from 'pages/Session/Session';
import Profile from 'pages/Profile';
import NoMatch from 'pages/NoMatch';
import Room from 'pages/Room';

const App = () => {

  const checked = useSelector(state => state.checked);
  const role = useSelector(state => state.role);

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
      checked ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ pathname: '/login' }} />
        )
    )} />
  )

  const PrivateAdminRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
      role === 'admin' ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ pathname: '/' }} />
        )
    )} />
  )
  
  return (
    <Router>
      <Navbar />
      <main>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signin" exact component={SignIn} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/formations" exact component={Formations} />
          <PrivateRoute exact path="/formation/:id" component={Formation} />
          <PrivateRoute exact path="/sessions/:sessionId" component={Inscription} />
          <PrivateAdminRoute path="/users" component={Users} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateAdminRoute path="/category" component={AddCategory} />
          <PrivateAdminRoute path="/room" component={Room} />
          <PrivateRoute path='/calendar' component={Sessions} />
          <Route component={NoMatch} />
        </Switch>
      </main>
    </Router>
  );
}
export default App;
