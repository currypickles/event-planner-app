import React, { Component } from 'react';
import TitleInput from '../Input/TitleInput';
import DescriptionInput from '../Input/DescriptionInput';
import Classification from '../Input/Classification';
import PriorityInput from '../Input/PriorityInput';
import Attendees from '../Input/Attendees/Attendees';
import OrganizerInput from '../Input/OrganizerInput';
import ResourcesInput from '../Input/ResourcesInput';
import './Form.css';

class Form extends Component {
    state = {
        titleInput: '',
        titleCharCounter: 0,
        description: '',
        desCharCounter: 0,
        classification: 'PUBLIC',
        priority: '0',
        attendees: [],
        organizer: '',
        resources: '',
        errors: {
            titleErrMsg: '',
            emailErrMsg: ''
        }
    };

    handleCharLimit = (event) => {
        this.setState({ [event.target.id]: event.target.value.length });
    }

    handleNumAttendees = (event) => {
        this.setState(prevState => ({
            attendees: [...prevState.attendees, {
                participationStatus: 'NEEDS-ACTION',
                participationRole: 'REQ-PARTICIPANT',
                rsvp: 'FALSE',
                mailto: ''
            }]
        }));
    };

    handleFormControl = (event) => {
        if (['mailto', 'rsvp'].includes(event.target.className)) {
            let attendees = [...this.state.attendees];
            attendees[event.target.dataset.id][event.target.className] = event.target.value;
            this.setState({ attendees }, () => console.log(this.state.attendees));
        } else {
            this.setState({ [event.target.name]: event.target.value });
        }
    };

    /************************************************************
    * Lines of text should not be longer that 75 octets. 
    * This function splits long content lines in to multiple lines 
    *************************************************************/
    foldLine(line) {
        const parts = [];
        let length = 75;
        while(line.length > length) {
            parts.push(line.slice(0, length));
            line = line.slice(length)
            length = 74;
        }
        parts.push(line);
        return parts.join('\r\n ');
    }

    validateForm(name, email) {
        const validEmailRegex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
        let errors = {};
        if (name.length === 0 || (name.length >= 0 && name.trim() === '')) {
            errors = { ...errors, titleErrMsg: 'Title is required!' };
        }
        if (email.length > 0 && !email.match(validEmailRegex)) {
            errors = { ...errors, emailErrMsg: 'Email is invalid' };
        }
        return errors;
    }

    downloadTxtFile = (e) => {
        e.preventDefault();

        const errors = this.validateForm(this.state.titleInput, this.state.organizer);
        if (errors.hasOwnProperty('titleErrMsg') || errors.hasOwnProperty('emailErrMsg')) {
            this.setState({ errors });
            console.log(errors)
            return;
        }

        const newEvent = {
            BEGIN: 'VCALENDAR',
            VERSION: '2.0',
            PRODID: '-//Team Curry Pickles//Ical Event App//EN',
            BEGIN2: 'VEVENT',
            PRIORITY: this.state.priority,
            DTSTAMP: '2020026T230518Z',
            UID: Math.random().toString(), // Placeholder for now 
            DTSTART: '20200306T120000',
            DTEND: '20200306T130000',
            CLASS: this.state.classification,
            SUMMARY: this.state.titleInput,
            DESCRIPTION: this.state.description.replace(/\n/gi,'\\n'),
            ORGANIZER: this.state.organizer,
            ATTENDEE: [...this.state.attendees],
            RESOURCES: this.state.resources.replace(/\s/gi, '').toUpperCase(),
            END2: 'VEVENT',
            END: 'VCALENDAR',
        }

        // Iterates over the newEvent object and puts each key and value into
        // an event array with the format - key:value as a string
        const event = [];
        for(let el in newEvent) {
            let str = '';
            if (el.match(/BEGIN[0-9]/)) {
                str = `BEGIN:${newEvent[el]}\n`;
                event.push(str);
                continue;
            }
            if (el.match(/END[0-9]/)) {
                str = `END:${newEvent[el]}\n`;
                event.push(str);
                continue;
            }
            if (el.match('ORGANIZER')) {
                if (newEvent[el] === '') { continue; }
                str = `${el};SENT-BY="mailto:${newEvent[el]}":mailto:${newEvent[el]}\n`
                event.push(this.foldLine(str));
                continue;
            }
            if (el.match('ATTENDEE')) {
                newEvent[el].forEach((x,i) => {
                    if (newEvent[el][i].mailto === '') {
                    } else {
                        str = `${el};PARTSTAT=${newEvent[el][i].participationStatus};ROLE=${newEvent[el][i].participationRole};RSVP=${newEvent[el][i].rsvp}:mailto:${newEvent[el][i].mailto}\n`;
                        event.push(this.foldLine(str));
                    }
                });
                continue;
            }
            if (el.match('RESOURCES')) {
                if (newEvent[el] === '') { continue; }
            }
            str = `${el}:${newEvent[el]}\r\n`;
            event.push(this.foldLine(str));
        }

        const element = document.createElement("a");
        const file = new Blob(event, {type: 'text/plain;charset=utf-8'});
        element.href = URL.createObjectURL(file);
        element.download = "myFile.ics";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.downloadTxtFile} onChange={this.handleFormControl}>
                    <TitleInput name='titleInput' limitCounter={this.handleCharLimit} counted={this.state.titleCharCounter} errMsg={this.state.errors.titleErrMsg} />
                    <DescriptionInput name='description' limitCounter={this.handleCharLimit} counted={this.state.desCharCounter}/>
                    <Classification name='classification' />
                    <PriorityInput name='priority' />
                    <OrganizerInput name='organizer' errMsg={this.state.errors.emailErrMsg} />
                    <Attendees attendees={this.state.attendees} 
                               numAttendees={this.state.attendeesNum} 
                               handleNumAttendees={this.handleNumAttendees} />
                    <ResourcesInput name='resources' />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
      }
}

export default Form;