import React from 'react';

const titleInput = (props)  => (
    <div>
        <label>Title:
            <input id='titleCharCounter'  
                   type='text' 
                   name={props.name} 
                   onChange={props.limitCounter}
                   maxLength='255' />
            <div style={{fontSize: '10px'}}>{props.counted}/255 character limit</div>
            <div style={{fontSize: '10px', color: 'red'}}>{props.errMsg}</div>
        </label>
    </div>
);

export default titleInput;