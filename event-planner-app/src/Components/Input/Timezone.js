import React from 'react';
import '../Input/Input.css';

const timezone = (props)  => (
    <div className='box-inline'>
        <label>Timezone:
            <select name={props.name} onChange={props.select} defaultValue='Pacific/Honolulu' className='select-margin'>
                <option value='Pacific/Honolulu'>Hawaii Standard Time</option>
                <option value='America/Anchorage'>Alaska Standard Time - Anchorage</option>
                <option value='America/Los_Angeles'>Pacific Standard Time - Los Angeles</option>
                <option value='America/Denver'>Mountain Standard Time - Denver</option>
                <option value='America/Chicago'>Central Standard Time - Chicago</option>
                <option value='America/New_York'>Eastern Standard Time - New York</option>
            </select>
        </label>
    </div>
);

export default timezone;