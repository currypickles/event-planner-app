import React from 'react';

const classification = (props)  => (
    <div>
        <label>Classification:
            <select name={props.name} defaultValue='PUBLIC' >
                <option value='PUBLIC'>Public</option>
                <option value='PRIVATE'>Private</option>
                <option value='CONFIDENTIAL'>Confidential</option>
            </select>
        </label>
    </div>
);

export default classification;