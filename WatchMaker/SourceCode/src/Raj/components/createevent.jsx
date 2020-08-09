//@Author - RajKumar B00849566
//@Author - Smit Panchal B00828070

import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Form, Button, InputGroup, Col, Row } from "react-bootstrap";
import "./events.css";

class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

 

  renderDescription = () => {
    //console.log(this.props.isCreate);
    return this.props.isCreate ? (
      <Form.Row>
        <Form.Group as={Col} controlId="txtarea">
          <Form.Label>
            Description:{" "}
            <span className="fstyle">
              {100 - this.props.about.length} words remaining
            </span>
          </Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Max 100 words.."
            name="about"
            maxLength="100"
            value={this.props.about}
            onChange={this.props.onDescriptionEnter}
          />
        </Form.Group>
      </Form.Row>
    ) : null;
  };

  //view for rendering upload image section
  renderUploadImg = () => {
    return this.props.isCreate ? (
      <Form.Row>
        <Form.Group as={Col} controlId="uploadimg">
          <Form.Label>
            Upload Image:{" "}
          </Form.Label>
          <Row>
          <Col>
          <input type="file"
            multiple
            className="form-control-file"
            id="imgupload"
            onChange={this.props.handleImgFiles}
            accept="image/*"
            />
            </Col>
          <Col>
            {this.renderClearImgBtn(this.props.imagePreviewUrl1)}
            </Col>
            </Row>


          {this.props.imageError}
          <br/>
          <Row>
            <Col>
              {this.renderImgPreview(this.props.imagePreviewUrl1)}

            </Col>
          </Row>
          </Form.Group>

      </Form.Row>
    ) : null;
  };

  //view for image preview section
  renderImgPreview = (img) => {
    return (img != '' && img != null) ? <img className="uploadimg" src={img} width="200" height="200" border="1"/> : null;
  }

  renderClearImgBtn = (img) => {
    return (img != '' && img != null) ? <button onClick={this.props.onClearImgBtnClick}>clear</button> : null;
  }


  render() {
    const myStyle = {
      width: "100%",
      height: "100%",
      // backgroundColor: "#c3c6d8",
      backgroundColor: "#ffffff",
      borderRadius: "7px",
      borderLeft: "0.6rem solid #2B85FD",
      boxShadow:
        "0 4.8px 4.2px rgba(0, 0, 0, 0.034), 0 8.7px 7.3px rgba(0, 0, 0, 0.048), 0 14.5px 12px rgba(0, 0, 0, 0.06), 0 24.3px 19.9px rgba(0, 0, 0, 0.072), 0 43.8px 35.4px rgba(0, 0, 0, 0.086), 0 102px 82px rgba(0, 0, 0, 0.12)",
    };

    let buttonText = this.props.isCreate
      ? this.props.isUpdate
        ? "Update"
        : "Create"
      : "Find Event";
    let hedingText = this.props.isCreate ? "Watch Details" : "Find a Ride";

    return (
      <div>
        <br />
        <div style={myStyle}>
          <div>
            <Col>
              <h3>{hedingText}</h3>
            </Col>
          </div>

          <Col>
            <Form
              noValidate
              validated={this.props.isValidated}
              onSubmit={this.props.mySubmitHandler}
            >
              <Form.Row>
                <Form.Group as={Col} controlId="eventId">
                  <Form.Label>Watch Name:</Form.Label>
                  <Form.Control
                    type="text"
                    value={this.props.watchname}
                    name="watchname"
                    maxLength="20"
                    onChange={this.props.onFromToEnter}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid type.
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>

             

              <Form.Row>
              <Row>
          <Form.Group as={Col}>
            <Form.Label> Quantity:
            </Form.Label>
            <div className="def-number-input number-input">
              <Form.Control
                value={this.props.quantity}
                name="quantity"
                onChange={this.props.onNumInputChange}
                type="number"
                maxLength="2"
                placeholder="0"
              />
            </div>
          </Form.Group>
          <Form.Group as={Col} controlId="toAddr">
            <Form.Label>
              Price: 
            </Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">CAD $</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="number"
                placeholder="0"
                name="price"
                maxLength="5"
                onChange={this.props.onNumInputChange}
                aria-describedby="inputGroupPrepend"
                value={this.props.price}
              />
            </InputGroup>
          </Form.Group>{" "}
        </Row>
              </Form.Row>
              {this.renderDescription()}
              {this.renderUploadImg()}
              <div style={{ paddingBottom: "10px" }}>
                <Row>
                  <Col>
                    <Button variant="primary" type="submit">
                      {buttonText}
                    </Button>
                  </Col>
                  

                </Row>
              </div>
            </Form>
          </Col>
        </div>
      </div>
    );
  }
}

export default CreateEvent;
