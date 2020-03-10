import React from 'react';

const titleInput = (props)  => (
    <div>
        <label>Title:
            <input type='text' name={props.name} required />
        </label>
    </div>
);

export default titleInput;