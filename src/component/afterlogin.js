import React from "react";
import { Table } from "react-bootstrap";

export class afterlogin extends React.Component {
  printUser() {
    console.log("Called print user");
    // let userID = localStorage.getItem("user");
    let username = localStorage.getItem("user")
    let token =localStorage.getItem("token");

    var jobDetailsArr = JSON.parse(localStorage.getItem("jobDetails"));

    console.log("Job Details Array: " + jobDetailsArr);
    console.log("User name-->" + username);
    var json = {};
    json.username = username;
    json.partsToBook = jobDetailsArr;

    console.log(json);
    console.log("Bearer "+token);
    fetch(
      "http://cloud7-env.eba-mm3kp2rp.us-east-1.elasticbeanstalk.com/companyz/book",
      {
        method: "POST",
        headers: { "Content-type": "application/json" ,
        Authorization : "Bearer "+token},
        body: JSON.stringify(json),
      }
    ).then((res) => {
      if (res) {
        if (res.status == 200) {
          this.props.history.push("/bookSuccess");
        } else if(res.status== 403)
          {
           window.alert("403 : Forbidden, User not authorized")
           this.props.history.push("/login");
        }
          else{
          this.props.history.push("/bookFailure");

        }
      }
    });
  }

  render() {
    return (
      <div>
      <Table striped bordered hover>
  <thead>
    <tr>
      <th>Username</th>
      <th>Quanity Ordered</th>
      <th>Watch ID </th>
      <th>Total Cost</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>{localStorage.getItem("username")}</td>
      <td>{localStorage.getItem("Qty")}</td>
      <td>{localStorage.getItem("WatchID")}</td>
      <td>{localStorage.getItem("price")}</td>
    </tr>
    
  </tbody>
</Table>
      </div>
    );
  }
}

export default afterlogin;
