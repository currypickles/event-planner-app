import React from 'react';

const resourcesInput = (props)  => (
    <div>
        <label>Resources:
            <input type='text' name={props.name} required />
        </label>
    </div>
);

export default resourcesInput;