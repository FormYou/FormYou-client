import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from 'components/Navbar/Navbar';
import './index.scss';

const Index = () => (
  <Router>
  <Navbar />
  <main>
    <h1>Hello !</h1>
  </main>
  </Router>
);

ReactDOM.render(<Index />, document.getElementById('root'));