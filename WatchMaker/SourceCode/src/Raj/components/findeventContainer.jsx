//@Author - RajKumar B00849566

import React, { Component } from "react";
import axios from 'axios';
import "./events.css";
import MaterialTable from 'material-table';
import { Container } from "@material-ui/core";


class FindEventContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transcations: [],
      columns: [
        { title: 'Watch Id', field: 'watch_id',type: 'numeric'  },
        { title: 'Quantity Ordered', field: 'qty_ordered', type: 'numeric' },
        { title: 'Ordered By', field: 'ordered_by' },
        {
          title: 'Orderd Date',
          field: 'order_date'
        },
      ]
    };
  }
  async componentDidMount() {
    this.setState({ loader: true });
    //API call to fetch data

    await axios.get(`https://se2gktifxk.execute-api.us-east-1.amazonaws.com/dev/watchorders `)
    .then(res => {

      const data = res.data;
      console.log(data);
      this.state.transcations.push(data);
      this.setState({ loader: false, transcations: data });
    }).catch(err =>  {
        console.log(err);
        //this.setState({ data:"error" });
    })
  }

  render() {
    
    
    return (
      
      <div>
        <Container>
        <MaterialTable
      title="Transcations"
      columns={this.state.columns}
      data={this.state.transcations}
      
          />
          </Container>
        </div>
    );
  }
}

export default FindEventContainer;
