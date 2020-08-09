import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Component from "./Sagar/sagar";

function App() {
  return (
      <Router>
        <div className="App">
            <h1>Working</h1>
          <Switch>

            <Route path='/Raj' exact>
              <Component/>
            </Route>
          </Switch>

        </div>
      </Router>

  );
}

export default App;
