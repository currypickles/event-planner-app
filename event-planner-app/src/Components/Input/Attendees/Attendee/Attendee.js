import React from 'react';
import './Attendee.css'

const attendee = (props)  => {
    const [ mailtoId, rsvpId ] = [...props.ids];
    return (
        <div>
            <label>Attendee:
                <input type='text' 
                       name={mailtoId} 
                       data-id={props.dataId} 
                       id={mailtoId}
                       className='mailto' />
            </label>
            <label className='rsvp-style'>RSVP:
                <select values={props.values.rsvp} name={rsvpId} data-id={props.dataId} id={rsvpId} className='rsvp'>
                    <option value='FALSE'>FALSE</option>
                    <option value='TRUE'>TRUE</option>
                </select>
            </label>
        </div>
    );
};

export default attendee;