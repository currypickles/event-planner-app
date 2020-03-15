import React from 'react';

const organizerInput = (props)  => (
    <div>
        <label>Organizer:
            <input type='text' name={props.name} />
            <div style={{fontSize: '10px', color: 'red'}}>{props.errMsg}</div>
        </label>
    </div>
);

export default organizerInput;