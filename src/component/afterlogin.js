import React from "react";
import { Button, Card } from "react-bootstrap";

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
       <Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src="holder.js/100px180" />
  <Card.Body>
    <Card.Title>Card Title</Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
    <Button variant="primary">Go somewhere</Button>
  </Card.Body>
</Card>
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
