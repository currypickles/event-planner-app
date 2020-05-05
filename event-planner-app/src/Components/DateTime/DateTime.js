import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const dateTime = (props)  => { 
    return (
        <div>
            <DatePicker id='startDate' 
                        selected={props.selectStart}
                        onChange={props.startDate}
                        showTimeSelect
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="MMMM d, yyyy h:mm aa" />
            <DatePicker id='endDate' 
                        selected={props.selectEnd}
                        onChange={props.endDate}
                        showTimeSelect
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="MMMM d, yyyy h:mm aa" />
        </div>
    );
};

export default dateTime;