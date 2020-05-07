import React, { Component } from "react";
import Form from './Components/Form/Form'
import './App.css';

export default class PopUp extends Component {
  handleClick = () => {
    this.props.toggle();
  };

  render() {
    return (
      <div className="form">
      	<Form />
        
      </div>
    );
  }
}
