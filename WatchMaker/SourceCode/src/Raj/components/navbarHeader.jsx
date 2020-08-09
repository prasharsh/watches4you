//@Author - RajKumar B00849566
/* @Author - Jigar Makwana B00842568 */

import React, { Component } from "react";
import { Nav, Button, Row, Col, Navbar } from "react-bootstrap";
import { Redirect, NavLink } from "react-router-dom";
import logo from "../images/logo.png";
import { MdNotificationsActive } from "react-icons/md";
import { BsWatch } from "react-icons/bs";

import Cookies from "js-cookie";
import axios from "axios";

class NavbarHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
    };
  }


  render() {

    return (
      <section>
        <Navbar className="navbg" expand="lg" sticky="top">
          <section>
            <Navbar.Brand href="/">
              <BsWatch/>
              <strong style={{ fontFamily: "unset", fontSize: "medium" }}>
                WatchMaker
              </strong>
            </Navbar.Brand>
          </section>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <ul className="navbar-nav">
              <Nav className="ml-auto" variant="pills">
                <NavLink
                  exact
                  activeClassName="nav-link active"
                  className="nav-link"
                  to="/transcations"
                  style={{ color: "white" }}
                >
                  View Transcations
                </NavLink>
                
              </Nav>
            </ul>
            <ul className="navbar-nav mr-auto"/>
            
          </Navbar.Collapse>
        </Navbar>
        

      </section>

    );
  }
}

export default NavbarHeader;
