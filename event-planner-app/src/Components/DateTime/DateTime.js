import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const dateTime = (props)  => { 
    const date = new Date();
    let disabled = false;
    let minStartTime, minEndTime, maxEndTime, maxStartTime = '';
    let errMsg = '';
    
    if (props.selectStart < props.stamp) {
        errMsg = <div><label style={{fontSize: '10px', color: 'red'}}>Fix start time!</label></div>;
    }
    if (props.selectEnd < props.selectStart) {
        errMsg = <div><label style={{fontSize: '10px', color: 'red'}}>Fix end time!</label></div>;
    }
    
    if (props.selectStart === null) {
        minStartTime = date;
        maxStartTime = new Date().setHours(23,59,0);
    } else if (props.selectStart.toDateString() === date.toDateString()) {
        minStartTime = date;
        maxStartTime = new Date().setHours(23,59,0);
    } else {
        minStartTime = 0;
        maxStartTime = 0;
    }

    if (props.selectEnd === null) {
        disabled = true;
        errMsg = <div><label style={{fontSize: '10px', color: 'red'}}>Please choose start date!</label></div>;
    } else if (props.selectEnd.toDateString() === props.selectStart.toDateString()) {
        minEndTime = props.selectStart;
        maxEndTime = new Date().setHours(23,59,0);
    } else {
        minEndTime = 0;
        maxEndTime = 0;
    }
    
    return (
        <div>
            <div>
                <label htmlFor='startDate'>Start:</label>
                <DatePicker id='startDate' 
                            selected={props.selectStart}
                            onChange={props.startDate}
                            showTimeSelect
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="MMMM d, yyyy h:mm aa" 
                            minDate={date}
                            minTime={minStartTime}
                            maxTime={maxStartTime}
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            placeholderText="Start Time" />
            </div>
            <div>
                <label htmlFor='endDate' style={{marginRight: 10}}>End:</label>
                <DatePicker id='endDate' 
                            selected={props.selectEnd}
                            onChange={props.endDate}
                            showTimeSelect
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="MMMM d, yyyy h:mm aa"
                            minDate={props.selectStart}
                            minTime={minEndTime}
                            maxTime={maxEndTime}
                            disabled={disabled}
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            placeholderText="End Time" />
            </div>
            {errMsg}
        </div>
    );
};

export default dateTime;