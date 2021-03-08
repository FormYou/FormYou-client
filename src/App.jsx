import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './index.scss';

import Navbar from 'components/Navbar/Navbar';
import Home from 'pages/Home/Home';
import SignIn from 'pages/SignIn/SignIn';
import SignUp from 'pages/SignUp/SignUp';

const App = () => {

  const id = useSelector(state => state.id);

  const checkAuth = () => {
    return id === '' ? false : true
  }

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
      checkAuth() ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ pathname: '/login' }} />
        )
    )} />
  )
  
  return (
    <Router>
        <Navbar />
        <main>
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="/signin" exact>
                    <SignIn />s
                </Route>
                <Route path="/signup" exact>
                    <SignUp />
                </Route>
            </Switch>
        </main>
    </Router>
  );
}
export default App;
