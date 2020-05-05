import React from 'react';
import '../Input/Input.css';

const timezone = (props)  => (
    <div className='box-inline'>
        <label>Timezone:
            <select name={props.name} onChange={props.select} defaultValue='Pacific/Honolulu' className='select-margin'>
                <option value='Pacific/Honolulu'>Hawaii Standard Time</option>
                <option value='America/New_York'>Eastern Time - New York</option>
            </select>
        </label>
    </div>
);

export default timezone;