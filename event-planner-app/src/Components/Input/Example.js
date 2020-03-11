import React from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class Example extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props)
        this.state = {
            startDate: new Date()
        };
    }

    someFn = () => {
        this.props.callBackFromParent(this.state.startDate);
    };


    handleChange = date => {
        this.setState({
            startDate: date
        });
    };

    render() {
        return (
            <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChange}
            />
        );
    }
}

export default Example;