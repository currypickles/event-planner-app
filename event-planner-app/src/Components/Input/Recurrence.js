import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const recurrence = (props)  => {
    const datePicker = props.recur !== 'ONCE' ? 
        <label>Until:
            <DatePicker selected={props.selected}
                    onChange={props.date}
                    dateFormat="MMMM d, yyyy"
                    minDate={props.startDate}
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select" />
        </label> : '';
    return ( 
        <div>
            <label>Repeat:
                <select name={props.name} defaultValue='ONCE' className='select-margin'>
                    <option value='ONCE'>Once</option>
                    <option value='DAILY'>Daily</option>
                    <option value='WEEKLY'>Weekly</option>
                    <option value='MONTHLY'>Monthly</option>
                    <option value='YEARLY'>Yearly</option>
                </select>
            </label>
            {datePicker}
            <label>
                <div style={{fontSize: '10px', color: 'red'}}>{props.errMsg}</div>
            </label>
        </div>
    );
};

export default recurrence;