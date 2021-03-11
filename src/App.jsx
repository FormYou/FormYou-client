import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './index.scss';

import Navbar from 'components/Navbar/Navbar';
import Home from 'pages/Home/Home';
import SignIn from 'pages/SignIn/SignIn';
import SignUp from 'pages/SignUp/SignUp';
import Formations from 'pages/Formations';
import Formation from 'pages/Formation';
import Users from 'pages/Users';
import NoMatch from 'pages/NoMatch/NoMatch';
import AddCategory from 'pages/AddCategory';

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
          <PrivateAdminRoute path="/users" component={Users} />
          <PrivateAdminRoute path="/category" component={AddCategory} />
          <Route component={NoMatch} />
        </Switch>
      </main>
    </Router>
  );
}
export default App;
