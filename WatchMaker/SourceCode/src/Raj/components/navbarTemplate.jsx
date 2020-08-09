//@Author - RajKumar B00849566
/* @Author - Jigar Makwana B00842568 */
import React, { Component } from "react";
import NavbarHeader from "./navbarHeader";
import createeventContainer from "./createeventContainer";
import FindEventContainer from "./findeventContainer";

import Error from "./errorpage";
import "./events.css";

import { Route, Switch } from "react-router-dom";


class NavbarTemplate extends Component {
  state = {};
  render() {
    return (
      <div>
 <div>
          <NavbarHeader />
        </div>
        <div className="content" style={{ overflow: "auto", height: "100%" }}>
          <Switch>
           
            <Route
              exact
              path="/"
              component={createeventContainer}
            ></Route>
            <Route
              exact
              path="/transcations"
              component={FindEventContainer}
            ></Route>
            <Route exact path="/*" component={Error} />
          </Switch>
        </div>
        <div>
          <div></div>
        </div>
      </div>
    );
  }
}

export default NavbarTemplate;
