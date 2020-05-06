import React from 'react';

const geoInput = (props)  => (
    <div>
        <label>Geo:
            <select name={props.name} defaultValue='Hawaii' className='select-margin'>
            	<option value='21.3069444, -157.8583333'>Hawaii</option>
                <option value='61.512619, -149.6001129'>Alaska</option>
                <option value='34.0522342, -118.2436849'>Pacific</option>
                <option value='43.6134987, -116.2034531'>Mountain</option>
                <option value='41.8781136, -87.6297982'>Central</option>
                <option value='42.331427, -83.0457538'>Eastern</option>
            </select>
        </label>
    </div>
);

export default geoInput;
