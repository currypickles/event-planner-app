import React from 'react';

const descriptionInput = (props)  => (
    <div>
        <label>Description:
            <textarea onChange={props.change} />
        </label>
    </div>
);

export default descriptionInput;