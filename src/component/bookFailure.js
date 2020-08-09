import React from "react";

export class bookFailure extends React.Component {
    render() {
        return(
            <div>
                <h3>Your Order cannot be completed since you are running short of credits!!
                     
                </h3>
                <a href="/">Home</a>
                <br></br>
                <br></br>
                <br></br>
            </div>
        );
      }
}

export default bookFailure;