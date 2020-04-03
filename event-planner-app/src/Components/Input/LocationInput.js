import React from 'react';

const resourcesInput = (props)  => (
    <div>
        <label>Location:
            <input type='text' name={props.name} />
        </label>
    </div>
);

export default resourcesInput;