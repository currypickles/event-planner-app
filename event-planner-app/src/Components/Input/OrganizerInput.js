import React from 'react';

const organizerInput = (props)  => (
    <div>
        <label>Organizer:
            <input type='email' name={props.name} required />
        </label>
    </div>
);

export default organizerInput;