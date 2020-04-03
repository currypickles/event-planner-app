import React from 'react';

const geoInput = (props)  => (
    <div>
        <label>Geo:
            <input type='float' name={props.name} />
        </label>
    </div>
);

export default geoInput;