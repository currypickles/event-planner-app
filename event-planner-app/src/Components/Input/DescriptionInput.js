import React from 'react';

const descriptionInput = (props)  => (
    <div>
        <label>Description:
            <textarea id='desCharCounter' 
                      type='text' 
                      name={props.name} 
                      maxLength='500' 
                      onChange={props.limitCounter} />
            <div style={{fontSize: '10px'}}>{props.counted}/500 character limit</div>
        </label>
    </div>
);

export default descriptionInput;