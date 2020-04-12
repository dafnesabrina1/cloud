import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import Dashboard from './View/Dashboard.js';
import SignIn from './View/SignIn.js';
import SignUp from './View/SignUp.js';

function App() {
  return (
    <Router>
      <Route exact path="/" component={SignIn} />
      <Route exact path="/sign-up" component={SignUp} />
      <Route exact path="/dashboard" component={Dashboard} />
    </Router>
  );
}

export default App;
