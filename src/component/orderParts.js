import React, { Component } from "react";
import { Table, Button, Card } from "react-bootstrap";
import axios from "axios";

export default class orderParts extends Component {
  constructor() {
    super();

    this.state = {
      watches: [],
    };
  }

  componentDidMount() {
    localStorage.getItem("WatchID");
    const url =
      "https://se2gktifxk.execute-api.us-east-1.amazonaws.com/dev/getbyid?id=" +
      localStorage.getItem("WatchID");

    fetch(url)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            watches: result,
          });
          console.log(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error);
        }
      );
  }
  orderWatch(index) {
    const unitPrice = parseInt(index.watch_price);
    const qty = parseInt(this.refs.qty.value);
    if (parseInt(index.watch_quantity) < qty) {
      alert("Cannot order more than available quantity");
    } else {
      const price = unitPrice * qty;
      console.log(price);
      console.log(index);
      localStorage.setItem("Qty", qty);
      localStorage.setItem("Product_name", index.watch_name);
      localStorage.setItem("WatchID", index.watch_id);
      localStorage.setItem("price", price);
      console.log(parseInt(index.watch_quantity) - qty);
      localStorage.setItem("reducedQty", parseInt(index.watch_quantity) - qty);
      console.log("WatchID : " + index.watch_id);
      this.props.history.push("/login");
    }
  }
  renderTable() {
    console.log(this.state.watches);
    if (!this.state.watches) {
      return null;
    }
    return <div>{this.renderWatches()}</div>;
  }

  sendToLogin() {
    localStorage.setItem("WatchDetails", JSON.stringify(this.state.tableData));
    localStorage.removeItem("logInResults");
    this.props.history.push("/login");
  }

  renderWatches() {
    const { watches } = this.state;
    console.log(watches);
    return watches.map((index) => (
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={index.img_url} />
        <Card.Body>
          <Card.Title>Watch Details</Card.Title>
          <Card.Text>
            Watch Id: {index.watch_id}
            <br />
            Watch Name: {index.watch_name}
            <br />
            Watch Description: {index.about}
            <br />
            Quantity Available: {index.watch_quantity} <br />
            Price: {index.watch_price}
            <br />
            Select Quantity:{"   "}
            <input
              ref="qty"
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              max={index.watch_quantity}
            />
          </Card.Text>
          <Button variant="primary" onClick={() => this.orderWatch(index)}>
            Checkout
          </Button>
        </Card.Body>
      </Card>
    ));
  }

  render() {
    return (
      <React.Fragment>
        <div className="inner">
          <h1>Watch Details</h1>
          <br />
          <br />
          {this.renderTable()}
          <br />
          <br />
        </div>
      </React.Fragment>
    );
  }
}
