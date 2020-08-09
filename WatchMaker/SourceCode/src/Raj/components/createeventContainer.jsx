//@Author - RajKumar B00849566

import React, { Component } from "react";
import { Col, Container, Row,CardColumns } from "react-bootstrap";
import CreateEvent from "./createevent";
import SortAndSearch from "./sortAndSearch";
import PostEventHistory from "./posteventhist";
import { Redirect } from "react-router-dom";
import axios from 'axios';
import Cookies from "js-cookie";
import "./events.css";
import Loader from './loader'
import { storage } from '../firebase';

class CreateEventContainer extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isMasked: false,
      loader: false,
      watchname: "",
      
      quantity: 0,
      price: 0,
      
      about: "",
      eventId: 0,
      isUpdate: false,
      updateItemId: 0,
      searchTerm: "",
      searchBy: "watch_name",
      isValidated: false,
      sortyBy: "id",
      imageError: '',
      imagePreviewUrl1: '',
      files: [],
      imageurls:[],
      eventHistoryToDisplay: [],
      eventHistory: [],
    };
  }

  //Get all the evnts for a user
  async componentDidMount() {
    this.setState({ loader: true });
    //API call to fetch data

    await axios.get(`https://se2gktifxk.execute-api.us-east-1.amazonaws.com/dev/getallwatchinfo`)
    .then(res => {

      const data = res.data;
      console.log(data);
      this.state.eventHistory.push(data);
      this.setState({loader: false,eventHistory:this.state.eventHistory[0],eventHistoryToDisplay:this.state.eventHistory[0]})
    }).catch(err =>  {
        console.log(err);
        //this.setState({ data:"error" });
    })
  };

  /*Create/Update button click handler
  Image uploades to Db here*/
  mySubmitHandler = async (event) => {

    event.preventDefault();
    const form = event.currentTarget;
    //Form validation
    if (form.checkValidity() === false) {
      this.setState({ isValidated: true });
      event.stopPropagation();
    } else {
      this.setState({ isMasked: true });
      //Upload image
      this.uploadImages()
        .then(async (imageurls) => {
          console.log(this.state.updateItemId);
          if (this.state.isUpdate) {

            let updatedItem = {
              id: this.state.updateItemId,
              name: this.state.watchname,
              quantity: this.state.quantity,
              price: this.state.price,
              about: this.state.about,
              url: imageurls[0],
              isWatchmaker:true
            };

            //API call for put
            //https://eventgoapi.herokuapp.com/createevent/updateEvent/
            //http://localhost:8080/createevent/updateEvent/
            await axios.put(`https://se2gktifxk.execute-api.us-east-1.amazonaws.com/dev/getallwatchinfo`,updatedItem )
              .then(res => {
                const { eventHistory } = this.state;
                console.log(eventHistory)
                if (res.data) {
                  eventHistory.map((item) => {
                    if (item.watch_id === this.state.updateItemId) {
                      item.watch_name = this.state.watchname;
                      item.watch_quantity = this.state.quantity;
                      item.watch_price = this.state.price;
                      item.about = this.state.about;
                      item.img_url = imageurls[0]
                    }
                  });
                }

                this.setState({
                  eventHistory: eventHistory,
                  eventHistoryToDisplay: eventHistory,
                  watchname: "",
                  price: 0,
                  quantity: 0,
                  about: "",
                  isUpdate: false,
                  isValidated: false,
                  imagePreviewUrl1: "",
                  files: [],
                  imageurls:[]
                });
                document.getElementById("imgupload").value = null;

              }).catch(err => {
                console.log(err);
                //this.setState({ data:"error" });
              })

              this.setState({ isMasked: false });
          } else {
            let newItem = {
              name: this.state.watchname,
              quantity: this.state.quantity,
              price: this.state.price,
              about: this.state.about,
              url: imageurls[0],
            };
            //console.log(newItem)
            //API call for push
            //https://eventgoapi.herokuapp.com/createevent/postEvent/
            //http://localhost:8080/createevent/postEvent/
            await axios.post(`https://se2gktifxk.execute-api.us-east-1.amazonaws.com/dev/getallwatchinfo`,  newItem )
              .then(res => {

                const data = res.data;
                console.log(data);
                this.setState({
                  eventHistory: data,
                  eventHistoryToDisplay: data,
                  watchname: "",
                  price: 0,
                  quantity: 0,
                  about: "",
                  isUpdate: false,
                  isValidated: false,
                  imagePreviewUrl1: "",
                  files: [],
                  imageurls:[]
                });
                document.getElementById("imgupload").value = null;
                this.setState({ isMasked: false });
              }).catch(err => {
                console.log(err);
              })
          }
      });
    }
  };

  //triggers when text entered to From and To fields
  onFromToEnter = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  };

  //triggers when text entered to numeric fields
  onNumInputChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    if (value >= 0 && value.length <= 5) {
      this.setState({ [name]: value });
    }
  };

  //triggers when text entered to Description field
  onDescriptionEnter = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    if (value.length <= 100) {
      this.setState({ [name]: value });
    }
  };

  //triggers when text entered to From and To fields
  onEventddChange = (event) => {
    this.setState({ eventTypeVal: event.target.value });
  };

  //Click on posted events, updating feature.
  onPostedEvetClicked = (history) => {
    //console.log(history)
    const {
      watch_id,
      watch_name,
      watch_quantity,
      watch_price,
      about,
      img_url,

    } = history;

    this.setState({
      updateItemId: watch_id,
      watchname: watch_name,
      quantity: watch_quantity,
      price: watch_price,
      about: about == null? "":about,
      isUpdate: true,
      imagePreviewUrl1: img_url,
    });
  };

  //Delete posted events
  onDeleteEvetClicked = async (history) => {
    let { eventHistory } = this.state;
    //put to API
    let id = { id: history.watch_id };
    console.log(id)
    await axios.delete(`https://se2gktifxk.execute-api.us-east-1.amazonaws.com/dev/getallwatchinfo`, { data:  id })
      .then(res => {
        if (res.data) {
          let filteredevents = eventHistory.filter((item) => item.watch_id != history.watch_id);
          this.setState({
            eventHistory: filteredevents,
            eventHistoryToDisplay: filteredevents,
          });
        }
      }).catch(err => {
        console.log(err);
        //this.setState({ data:"error" });
      })
  };

  //Render view for posted events
  renderPostEventHistory = () => {
    return this.state.eventHistoryToDisplay.length > 0 ? (
      this.state.eventHistoryToDisplay.map((item) => (
        
        <PostEventHistory
          key={item.watch_id}
          eventHistory={item}
          onPostedEvetClicked={this.onPostedEvetClicked}
          onDeleteEvetClicked={this.onDeleteEvetClicked}
        />
      ))
    ) : (
      <div>No items to display</div>
    );
  };

  /*Search and Sort Feature --start*/
  onSearchTermChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    console.log(name,value)
    this.setState({ [name]: value });
    const searchBy = this.state.searchBy;
    let filteredEventHistory = "";
    if (value.length > 0) {
      filteredEventHistory = this.state.eventHistory.filter(
        (item) =>
          item[searchBy]
            .toString()
            .toLowerCase()
            .indexOf(value.toString().toLowerCase()) != -1
      );
    } else {
      filteredEventHistory = this.state.eventHistory;
    }
    this.setState({ eventHistoryToDisplay: filteredEventHistory });
  };

  //searchby dropdown change event
  onSearchByChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  };

  //sort dropdown change event
  onSortByChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
    let { eventHistoryToDisplay } = this.state;
    eventHistoryToDisplay.sort((a, b) => (a[value] > b[value] ? 1 : -1));
    this.setState({ eventHistoryToDisplay: eventHistoryToDisplay });
  };
  /*Search and Sort Feature --end*/

  /* Upload Image Feature --start */
  //Function to upload images to Firebase
  uploadImages = () => {
    //event.preventDefault();
    let urls = [];
    let counter = -1;
    this.setState({ imageurls: [] })
    let { files } = this.state;
    return new Promise((resolve, reject) => {
      if (files.length > 0) {
        files.forEach((file, index) => {

          //Upload images to Firebase
          storage.ref(`images/${file.name}`).put(file).on(
            "state_changed",
            snapshot => { },
            error => {
              console.log(error)
            },
            () => {
              storage
                .ref("images")
                .child(file.name)
                .getDownloadURL().then(url => {
                  //console.log(url)
                  //get the image URL
                  urls.push(url)
                  counter = counter + 1;
                  if (counter == files.length - 1) {
                    resolve(urls)
                  }
                })
            }
          )
        });

      }
      else {
        if (this.state.isUpdate) {
          if (this.state.imagePreviewUrl1 != null) {
            urls.push(this.state.imagePreviewUrl1)
          }
          resolve(urls);
        }
        resolve(urls);
      }
    })
  };

  handleImgFiles = e => {
    if (e.target.files.length > 1) {
      e.preventDefault();
      this.setState({ imageError: 'Only two images allowed...' })
    } else {
      let reader1 = new FileReader();
      let file1 = e.target.files[0];
      this.state.files.push(file1);
      reader1.onloadend = () => {
        this.setState({
          imagePreviewUrl1: reader1.result,imageError:''
        });
      }
      reader1.readAsDataURL(file1)
    }
  };

  onClearImgBtnClick = e => {
    e.preventDefault();
    this.setState({
      imageError: '',
      imagePreviewUrl1: '',
      files: [],
      imageurls: []
    });
    document.getElementById("imgupload").value = null;
  }
  /* Upload Image Feature --end */

  renderMask = () => {
    return (
      this.state.isMasked ?
        <div className="screenmask" >
          <Row className="justify-content-center align-items-center">
            <div style={{ paddingTop: "134px" }}><Loader /></div>
          </Row>
        </div> : null
    );
  }

  render() {
    
    return (
      <div className="pb-5">

        {this.renderMask()}

        <Container>
          <Row>
            <Col>
              <CreateEvent
                mySubmitHandler={this.mySubmitHandler}
                onFromToEnter={this.onFromToEnter}
                onDescriptionEnter={this.onDescriptionEnter}
                onNumInputChange={this.onNumInputChange}
                handleImgFiles={this.handleImgFiles}
                watchname={this.state.watchname}
                quantity={this.state.quantity}
                price={this.state.price}
                about={this.state.about}
                isValidated={this.state.isValidated}
                imagePreviewUrl1={this.state.imagePreviewUrl1}
                isCreate={true}
                isUpdate={this.state.isUpdate}
              />
            </Col>
            <Col>
              <br />
              <Row>
                <SortAndSearch
                  onSearchTermChange={this.onSearchTermChange}
                  onSearchByChange={this.onSearchByChange}
                  onSortByChange={this.onSortByChange}
                  searchTerm={this.state.searchTerm}
                  searchBy={this.state.searchBy}
                  sorthBy={this.state.sorthBy}
                  isCreate={true}
                />
              </Row>
              <br/>
              <Row className="justify-content-center align-items-center">
                
                {this.state.loader ? <Loader /> : <CardColumns className="card-columns-2">{this.renderPostEventHistory()}</CardColumns>}
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default CreateEventContainer;
