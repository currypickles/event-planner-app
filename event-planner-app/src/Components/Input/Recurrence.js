import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const recurrence = (props)  => {
    const datePicker = props.recur !== 'ONCE' ? 
        <label>Until:
            <DatePicker selected={new Date()}
                    onChange={props.date}
                    showTimeSelect
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="MMMM d, yyyy h:mm aa" />
        </label> : '';
    return ( 
        <div>
            <label>Repeat:
                <select name={props.name} defaultValue='ONCE' className='select-margin'>
                    <option value='ONCE'>Once</option>
                    <option value='DAILY'>Daily</option>
                </select>
            </label>
            {datePicker}
        </div>
    );
};

export default recurrence;