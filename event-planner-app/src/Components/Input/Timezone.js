import React from 'react';
import '../Input/Input.css';

const timezone = (props)  => (
    <div className='box-inline'>
        <label>Timezone:
            <select name={props.name} onChange={props.select} defaultValue='Pacific/Honolulu' className='select-margin'>
                <option value='Pacific/Honolulu'>Hawaii Standard Time</option>
                <option value='America/Anchorage'>Alaska Time - Anchorage</option>
                <option value='America/Los_Angeles'>Pacific Time - Los Angeles</option>
                <option value='America/Denver'>Mountain Time - Denver</option>
                <option value='America/Chicago'>Central Time - Chicago</option>
                <option value='America/New_York'>Eastern Time - New York</option>
            </select>
        </label>
    </div>
);

export default timezone;