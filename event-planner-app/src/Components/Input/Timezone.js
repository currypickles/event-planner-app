import React from 'react';
import './Input.css';

const timezone = (props)  => (
    <div className='box-inline'>
        <label>Timezone:
            <select name={props.name} defaultValue='PUBLIC' className='select-margin'>
                <option value='Pacific/Honolulu'>Hawaii Standard Time</option>
                <option value='America/New_York'>Eastern Time - New York</option>

            </select>
        </label>
    </div>
);

export default timezone;