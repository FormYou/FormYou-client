import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from 'components/Navbar/Navbar';
import Home from 'pages/Home/Home';
import SignIn from 'pages/SignIn/SignIn';
import './index.scss';

const Index = () => (
  <Router>
	  <Navbar />
	  <main>
		  <Switch>
			  <Route path="/" exact>
			  	<Home />
			  </Route>
			  <Route path="/signin" exact>
			  	<SignIn />
			  </Route>
		  </Switch>
	  </main>
  </Router>
);

ReactDOM.render(<Index />, document.getElementById('root'));
