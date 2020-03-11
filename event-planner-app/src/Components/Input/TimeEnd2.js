import React from 'react';

const descriptionInput = (props)  => (
    <div>
        <label>End Date:
            <textarea onChange={props.change} required />
        </label>
    </div>
);

export default descriptionInput;