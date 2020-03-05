import React from 'react';

const titleInput = (props)  => (
    <div>
        <label>Title:
            <input onChange={props.change} required />
        </label>
    </div>
);

export default titleInput;