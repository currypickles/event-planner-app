import React from 'react';

const locationInput = (props)  => (
    <div>
        <label>Location:
            <input type='text' name={props.name} />
        </label>
    </div>
);

export default locationInput;