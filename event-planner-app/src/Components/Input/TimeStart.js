import React from 'react';

const descriptionInput = (props)  => (
    <div>
        <label>Start Date:
            <textarea onChange={props.change} required />
        </label>
    </div>
);

export default descriptionInput;