import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const recurrence = (props)  => {
    const displayCheck = props.recur !== 'ONCE' ?
        <div>
            <label style={{display: 'inline'}}>End Repeat Date
                <input type='checkbox' onChange={props.checked} checked={props.isChecked} style={{width: '10%', display: 'inline'}} />
            </label>        
        </div> : '';

    const datePicker = props.isChecked && props.recur !== 'ONCE' ? 
        <div>
            <label style={{display: 'block'}}>Until:
                <DatePicker selected={props.selected}
                        onChange={props.date}
                        minDate={props.startDate}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select" />
            </label>
        </div> : '';
    return ( 
        <div>
            <label>Repeat:
                <select name={props.name} onChange={props.freq} defaultValue='ONCE' className='select-margin'>
                    <option value='ONCE'>Once</option>
                    <option value='DAILY'>Daily</option>
                    <option value='WEEKLY'>Weekly</option>
                    <option value='MONTHLY'>Monthly</option>
                    <option value='YEARLY'>Yearly</option>
                </select>
            </label>
            {displayCheck}
            {datePicker}
            <label>
                <div style={{fontSize: '10px', color: 'red'}}>{props.errMsg}</div>
            </label>
        </div>
    );
};

export default recurrence;