import React from "react";
import { Table, Button } from "react-bootstrap";

export class afterlogin extends React.Component {
  constructor() {
    super();
    this.state = {
      credits: "",
      curTime: new Date().toLocaleString(),
    };

    this.placeOrder = this.placeOrder.bind(this);
  }
  componentDidMount() {
    let name = localStorage.getItem("username");
    fetch("http://1c3e8e29f3d0.ngrok.io/userCredit?username=" + name)
      .then((response) => response.json())
      .then((data) => {
        console.log(data[0]);
        this.setState({
          credits: data[0].credit,
        });
      });
  }

  placeOrder() {
    console.log(this.state.curTime);
    let details = {
      id: localStorage.getItem("WatchID"),
      product_name: localStorage.getItem("Product_name"),
      qty: localStorage.getItem("reducedQty"),
      bill: localStorage.getItem("price"),
      order_date: this.state.curTime,
      ordered_by: localStorage.getItem("username"),
    };
    fetch("http://localhost:8080/api/watches/newOrder", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(details),
    })
      .then((response) => response.json())
      .then((data) => {});
  }

  render() {
    return (
      <div>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Username</th>
              <th>Quanity Ordered</th>
              <th>Watch ID </th>
              <th>Credits Available </th>
              <th>Total Cost</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{localStorage.getItem("username")}</td>
              <td>{localStorage.getItem("Qty")}</td>
              <td>{localStorage.getItem("WatchID")}</td>
              <td>{this.state.credits}</td>
              <td>{localStorage.getItem("price")} CAD</td>
            </tr>
          </tbody>
        </Table>
        <Button
          variant="dark"
          disabled={
            parseInt(this.state.credits) <
            parseInt(localStorage.getItem("price"))
          }
          onClick={this.placeOrder}
        >
          Place Order
        </Button>
        <br></br>
        <br></br>
        <a href="/"> Home</a>
      </div>
    );
  }
}

export default afterlogin;
