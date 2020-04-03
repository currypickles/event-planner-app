import React from 'react';
import './Input.css';

const timezone = (props)  => (
    <div className='box-inline'>
        <label>Timezone:
            <select name={props.name} defaultValue='PUBLIC' className='select-margin'>
                <option value='HST'>Hawaii State Time</option>
                <option value='GMT-7'>Pacific Daylight Time</option>

            </select>
        </label>
    </div>
);

export default timezone;