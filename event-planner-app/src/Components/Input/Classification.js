import React from 'react';
import './Input.css';

const classification = (props)  => (
    <div className='box-inline'>
        <label>Classification:
            <select name={props.name} defaultValue='PUBLIC' className='select-margin'>
                <option value='PUBLIC'>Public</option>
                <option value='PRIVATE'>Private</option>
                <option value='CONFIDENTIAL'>Confidential</option>
            </select>
        </label>
    </div>
);

export default classification;