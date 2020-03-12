import React from 'react';
import Attendee from './Attendee/Attendee';

const attendees = (props)  => {
    return (
        <div>
            <button type='button' onClick={props.handleNumAttendees}>Add Attendee</button>
            {props.attendees.map((val, idx) => {
                let ids = [`mailto-${idx}`, `rsvp-${idx}`];
                return <Attendee
                    ids={ids}
                    dataId={idx}
                    values={props.attendees[idx]}
                    key={idx} />
            })}
        </div>
    );
};

export default attendees;