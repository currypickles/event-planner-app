import React from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class Example extends React.Component {
    state = {
        startDate: new Date()
    };

    someFn1 = () => {
        this.props.myCallback1(this.state.startDate)
    };

    handleChange = date => {
        this.setState({
            startDate: date
        });
        this.props.change()
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