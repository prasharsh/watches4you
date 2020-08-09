//@Author - RajKumar B00849566

import React, { Component } from "react";
import { Col, Row,Card,Button } from "react-bootstrap";
import "./events.css";

class PostEventHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  imageurl = () => {
    let url = this.props.eventHistory.img_url + "/100px180";
    return (url);
  }

  render() {
     

    return (
      <div>
     
      <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={this.imageurl()} alt="No Image" width="100" height="200"/>
      <Card.Body>
        <Card.Title>{this.props.eventHistory.watch_name}</Card.Title>
        <Card.Text>
        
        <p>Watch quantity <strong>{this.props.eventHistory.watch_quantity}</strong></p>
        <p>Watch Price <strong> $ {this.props.eventHistory.watch_price}</strong></p>
        <p>about <strong>{this.props.eventHistory.about}</strong></p>

        
        </Card.Text>
            <Row>
              <Col>
        <Button onClick={() =>
                    this.props.onPostedEvetClicked(this.props.eventHistory)
                  } variant="primary">View</Button>
             </Col><Col>
            
          <Button onClick={() =>
                    this.props.onDeleteEvetClicked(this.props.eventHistory)
                  } variant="danger">Delete</Button>
          </Col>
            </Row>
      </Card.Body>
        </Card>
        <br/>
        </div>
    );
  }
}

export default PostEventHistory;
