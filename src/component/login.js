import React, { Component } from "react";
import { Form, Container, Row, Col, Image } from "react-bootstrap";
import "./login.css";

export default class login extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      fields: {},
      errors: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.loginForm = this.loginForm.bind(this);
    this.fetchAPI = this.fetchAPI.bind(this);
  }
  handleChange(e) {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields,
    });
  }
  loginForm(e) {
    e.preventDefault();
    if (this.validateForm()) {
      console.log("fields" + this.refs.username.value);

      let fields = {};
      fields["username"] = "";
      fields["password"] = "";
      this.setState({ fields: fields });

      console.log(window.getSelection().toString());

      this.fetchAPI(this.refs.username.value, this.refs.password.value);
    }
  }

  fetchAPI(usernameStr, passwordStr) {
    // param is a highlighted word from the user before it clicked the button
    console.log("Username" + usernameStr);
    console.log("Username" + passwordStr);
    let details = {
      username: usernameStr,
      password: passwordStr,
    };
    fetch(
      "http://cloudproject-env.eba-gqvtmz3e.us-east-1.elasticbeanstalk.com/api/watches/login",
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(details),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const loggedInUser = data[0].username;
        console.log("username" + loggedInUser);
        if (!loggedInUser) {
          console.log("Failure");
          localStorage.setItem("logInResults", "failure");
          alert("Invalid Credentials");
        } else {
          console.log("TResult of response   " + loggedInUser);
          // localStorage.setItem("token", response.resultStr.token);
          // localStorage.setItem("user", response.resultStr.uerId);
          localStorage.setItem("username", loggedInUser);
          this.props.history.push("/afterLogin");
        }
      });
  }

  validateForm() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
    //Password
    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "password cannot be empty";
    }
    if (!fields["username"]) {
      formIsValid = false;
      errors["username"] = "username cannot be empty";
    }

    this.setState({
      errors: errors,
    });
    return formIsValid;
  }

  render() {
    return (
      <div className="LoginForm">
        <Row>
          <Col>
            <form className="Form" method="post" onSubmit={this.loginForm}>
              <h3>Sign In</h3>

              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  ref="username"
                  onChange={this.handleChange}
                  className="form-control"
                  placeholder="Enter email"
                />
                <div className="errorMsg">{this.state.errors.username}</div>
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  ref="password"
                  onChange={this.handleChange}
                  className="form-control"
                  placeholder="Enter password"
                />
                <div className="errorMsg">{this.state.errors.password}</div>
              </div>

              <button type="submit" className="btn btn-success btn-block">
                Submit
              </button>
              <p className="forgot-password text-right">
                Forgot <a href="#">password?</a>
              </p>
            </form>
          </Col>
          {/* <Col className="image">
        </Col> */}
        </Row>
      </div>
    );
  }
}
