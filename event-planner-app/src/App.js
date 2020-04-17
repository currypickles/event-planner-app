import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Form from './Components/Form/Form'
import './App.css';
import PopUp from "./PopUp";

class App extends Component {  

	state = {
    	seen: false
  	};

  	togglePop = () => {
    	this.setState({
      	seen: !this.state.seen
    	});
  	};

    render() {
      return (

        <div className='post'>
        	<h1>Create A Calander Event</h1>
        	<div className='button'>
          		<button onClick={this.togglePop}>Create An Event</button>
        	</div>
        	{this.state.seen ? <PopUp toggle={this.togglePop} /> : null}
        </div>
        
      );
    }
}

export default App;
