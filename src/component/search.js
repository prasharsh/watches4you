import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";
import "../App.css";

class search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Watches: [],
    };
  }

  componentDidMount() {
    const url =
      "https://se2gktifxk.execute-api.us-east-1.amazonaws.com/dev/getallwatchinfo";

    fetch(url)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            Watches: result,
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

  renderTable() {
    const { Watches } = this.state;
    console.log(Watches);
    if (Watches.length > 0) {
      return (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th></th>
              <th>Watch Id</th>
              <th>Watch Name</th>
              <th>watch Quantity</th>
              <th>Watch Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.renderWatches()}</tbody>
        </Table>
      );
    } else {
      return <div>No Watches</div>;
    }
  }

  orderWatch(index) {
    console.log(index);
    localStorage.setItem("WatchID", index.watch_id);
    console.log("WatchID : " + index.watch_id);
    this.props.history.push("/orderParts");
  }
  renderWatches() {
    const { Watches } = this.state;
    if (Watches.length > 0) {
      return Watches.map((index) => (
        <>
          <tr>
            <td>
              <img
                src={index.img_url}
                alt="watch picture"
                width="100"
                height="100"
              ></img>
            </td>
            <td>{index.watch_id}</td>
            <td>{index.watch_name}</td>
            <td>{index.watch_quantity}</td>
            <td>{index.watch_price}</td>
            <td>
              <Button variant="dark" onClick={() => this.orderWatch(index)}>
                Get Watch
              </Button>
            </td>
          </tr>
        </>
      ));
    } else {
      return <div>No Watches</div>;
    }
  }

  filterWatches() {
    console.log(this.refs.Watch.value);
    this.setState({
      Watches: this.state.Watches.filter(
        (item) => item.watch_name === this.refs.Watch.value
      ),
    });
  }

  reset() {
    window.location.reload();
  }
  render() {
    return (
      <React.Fragment>
        <div className="inner">
          <h2>Watches</h2>
          <br />
          <br />
          <input
            type="text"
            ref="Watch"
            placeholder="Enter Watch Name"
            aria-label="Search"
          />{" "}
          {"    "}
          <Button
            variant="dark"
            type="submit"
            onClick={() => this.filterWatches()}
          >
            Search
          </Button>
          {"    "}
          <Button variant="dark" onClick={() => this.reset()}>
            Reset
          </Button>
          <br />
          <br />
          {this.renderTable()}
        </div>
      </React.Fragment>
    );
  }
}

export default search;
