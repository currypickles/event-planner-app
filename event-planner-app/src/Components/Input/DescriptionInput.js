import React from 'react';

const descriptionInput = (props)  => (
    <div>
        <label>Description:
            <textarea type='text' name={props.name} required />
        </label>
    </div>
);

export default descriptionInput;