import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

import CovidSimulationPage from "./pages/CovidSimulationPage";

import './assets/App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <CovidSimulationPage/>
        </Route>
        <Redirect to="/"/>
      </Switch>
    </Router>
  );
}

export default App;
