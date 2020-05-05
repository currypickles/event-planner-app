import React  from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// class Dates extends React.Component {
//     constructor() {
//         super();
//         this.handleChange = this.handleChange.bind(this);
//         this.state = {
//             startDate: new Date()
//         };
//     }
//
//     handleSelected = date => {
//
//     }
//
//     handleChange = date => {
//         this.setState({
//             startDate: date
//         });
//         this.props.methodfromparent(this.state.startDate)
//     };
//
//
//     render() {
//         let d = new Date();
//         d.setHours(23);
//         d.setMinutes(59);
//     return (
//         <div>
//             <DatePicker selected={this.state.startDate}
//                 onChange={this.handleChange}
//                 minDate = {this.props.minDay}
//                 minTime = {this.props.minTiming}
//                 maxTime = {d}
//                 showTimeSelect
//                 timeIntervals={15}
//                 timeCaption="Time"
//                 dateFormat="MMMM d, yyyy h:mm aa" />
//         </div>
//
//     );
//     }
// }

const dates = (props) => {
    // let d = new Date();
    // d.setHours(23);
    // d.setMinutes(59);


    return (
        <div>
            <DatePicker selected={props.selected}
                onChange={props.date}
                minDate = {props.minDay}
                minTime = {props.minTiming}
                maxTime = {props.maxTiming}
                showTimeSelect
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="MMMM d, yyyy h:mm aa" />
        </div>
    );
 };

export default dates;
//export default Dates;