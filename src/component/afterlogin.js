import React from "react";
import { Button } from "react-bootstrap";

export class afterlogin extends React.Component {
  printUser() {
    console.log("Called print user");
    let userID = localStorage.getItem("user");
    let token =localStorage.getItem("token");

    var jobDetailsArr = JSON.parse(localStorage.getItem("jobDetails"));

    console.log("Job Details Array: " + jobDetailsArr);
    console.log("User name-->" + userID);
    var json = {};
    json.userId = userID;
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
        <h3>Successfully Logged In</h3>
        <p>Do you want to confirm Order?</p>
        <br></br>
        <br></br>
        <br></br>
        <Button
          size="sm"
          variant="dark"
          type="submit"
          onClick={() => this.printUser()}
        >
          Confirm booking
        </Button>
      </div>
    );
  }
}

export default afterlogin;
