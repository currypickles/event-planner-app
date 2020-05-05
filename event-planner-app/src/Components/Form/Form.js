import React, { Component } from 'react';
import TitleInput from '../Input/TitleInput';
import Timezone from '../Input/Timezone';
import DescriptionInput from '../Input/DescriptionInput';
import LocationInput from '../Input/LocationInput';
import Classification from '../Input/Classification';
import PriorityInput from '../Input/PriorityInput';
import Attendees from '../Input/Attendees/Attendees';
import OrganizerInput from '../Input/OrganizerInput';
import ResourcesInput from '../Input/ResourcesInput';
import Recurrence from '../Input/Recurrence';
import './Form.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class Form extends Component {
    state = {
        titleInput: '',
        startDate: new Date(),
        endDate: new Date(),
        stamp: new Date(),
        timezone: 'Pacific/Honolulu',
        titleCharCounter: 0,
        description: '',
        location: '',
        geo: { lat: 0, lon: 0 },
        desCharCounter: 0,
        classification: 'PUBLIC',
        priority: '0',
        attendees: [],
        organizer: '',
        resources: '',
        recurrenceFreq: 'ONCE',
        recurrenceDate: '',
        recurrIsChecked: false,
        errors: {
            titleErrMsg: '',
            emailErrMsg: '',
            attendeeErrMsg: '',
            recurErrMsg: ''
        }
    };

    handleChange = date => {
        this.setState({
            startDate: date
        });
    };

    handleChange2 = date => {
        this.setState({
            endDate: date
        });
    };

    handleRecurrenceChkBx = () => { 
        this.setState({ recurrIsChecked: !this.state.recurrIsChecked }); 
        if(this.state.recurrIsChecked === false) { this.setState({ recurrenceDate: '' }); }
    };

    handleRecurrenceDate = date => { this.setState({ recurrenceDate: date }); };

    handleRecurrenceFreq = () => { this.setState({ recurrenceDate: '', recurrIsChecked: false }); };

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
            this.setState({ errors: {isTyping: false}, attendees }, () => console.log(this.state.attendees));
        } else {
            this.setState({ errors: {isTyping: false}, [event.target.name]: event.target.value });
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

    /************************************************************
    * Time format
    *************************************************************/
    timeFormat(str, date) {
        const time = {
            seconds: '',
            minutes: '',
            hours: '',
            num_hours: '',
            month: '',
            day: '',
            year: ''
        };
      
        console.log(date.toString());
        str = date.toString().substr(4,20);
        time.month = str.substr(0,3);
        time.day = str.substr(4,2);
        time.year = str.substr(7,4);
        time.hours = str.substr(12, 2);
        time.minutes = str.substr(15, 2);
        time.seconds = str.substr(18, 2);
        return time;
    }

    validateForm(name, email, attendee, startDate, recurrenceDate) {
        const validEmailRegex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
        const recurStartDate = new Date(startDate); // This is important, need to create a new date ref
        let errors = {};
        if (name.length === 0 || (name.length >= 0 && name.trim() === '')) {
            errors = { ...errors, titleErrMsg: 'Title is required!' };
        }
        if (email.length > 0 && !email.match(validEmailRegex)) {
            errors = { ...errors, emailErrMsg: 'Email is invalid!' };
        }
        attendee.forEach((x, i) => {
            if (x.length > 0 && !x.match(validEmailRegex)) {
                errors = { ...errors, attendeeErrMsg: 'Email is invalid!' }
            }
            if (x.length > 0 && (attendee.indexOf(x) !== i || x === email)) {
                errors = { ...errors, attendeeErrMsg: 'Email is a duplicate!' }
            }
        });
        if ((recurrenceDate < recurStartDate.setHours(0,0,0,0)) && recurrenceDate !== '' && this.state.recurrIsChecked) {
            errors = { ...errors, recurErrMsg: 'Can\'t repeat before start date!' }
        }
        if (this.state.recurrIsChecked && recurrenceDate === '') {
            errors = { ...errors, recurErrMsg: 'Enter a date to repeat until!' }
        }
        return errors;
    }

    downloadTxtFile = (e) => {
        e.preventDefault();

        const errors = this.validateForm(this.state.titleInput, this.state.organizer, this.state.attendees.map(x => x.mailto), this.state.startDate, this.state.recurrenceDate);
        if (errors.hasOwnProperty('titleErrMsg') || errors.hasOwnProperty('emailErrMsg') || errors.hasOwnProperty('attendeeErrMsg') || errors.hasOwnProperty('recurErrMsg')) {
            this.setState({ errors });
            console.log(errors)
            return;
        }

        const newEvent = {
            BEGIN: 'VCALENDAR',
            BEGIN3: 'VTIMEZONE',
            TZID: this.state.timezone,
            END3: 'VTIMEZONE',
            VERSION: '2.0',
            PRODID: '-//Team Curry Pickles//Ical Event App//EN',
            BEGIN2: 'VEVENT',
            PRIORITY: this.state.priority,
            DTSTAMP: this.state.stamp,
            UID: Math.random().toString(), // Placeholder for now 
            DTSTART: this.state.startDate,
            DTEND: this.state.endDate,
            RRULE: this.state.recurrenceFreq,
            CLASS: this.state.classification,
            SUMMARY: this.state.titleInput,
            DESCRIPTION: this.state.description.replace(/\n/gi,'\\n'),
            LOCATION: this.state.location,
            ORGANIZER: this.state.organizer,
            ATTENDEE: [...this.state.attendees],
            RESOURCES: this.state.resources.replace(/\s/gi, '').toUpperCase(),
            END2: 'VEVENT',
            END: 'VCALENDAR',
        };

        // Iterates over the newEvent object and puts each key and value into
        // an event array with the format - key:value as a string
        const event = [];
        for(let el in newEvent) {
            let str = '';
            const months = { Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06', Jul: '07',
                Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12' };
            if(el.match('DTSTART')) {
                const time = this.timeFormat(str, this.state.startDate);
                str = `${el};TZID=${this.state.timezone}:${time.year}${months[time.month]}${time.day}T${time.hours}${time.minutes}${time.seconds}\r\n`;
                event.push(str);
                continue;
            }
            if(el.match('DTEND')) {
                const time = this.timeFormat(str, this.state.endDate);
                str = `${el};TZID=${this.state.timezone}:${time.year}${months[time.month]}${time.day}T${time.hours}${time.minutes}${time.seconds}\r\n`;
                event.push(str);
                continue;
            }
            if (el.match('RRULE')) {
                if (newEvent[el] === 'ONCE') { continue; }
                const time = this.timeFormat(str, this.state.recurrenceDate);
                if (newEvent[el] === 'MONTHLY') { 
                    if (this.state.recurrIsChecked) {
                        str = `${el}:FREQ=${newEvent[el]};UNTIL=${time.year}${months[time.month]}${time.day}T000000Z;BYMONTHDAY=${time.day}\r\n`;
                    } else {
                        str = `${el}:FREQ=${newEvent[el]};BYMONTHDAY=${this.state.startDate.getDate()}\r\n`;
                    }
                } else if (newEvent[el] === 'YEARLY') {
                    if (this.state.recurrIsChecked) {
                        str = `${el}:FREQ=${newEvent[el]};UNTIL=${time.year}${months[time.month]}${time.day}T000000Z;BYMONTH=${months[time.month]};BYMONTHDAY=${time.day}\r\n`;
                    } else {
                        str = `${el}:FREQ=${newEvent[el]};BYMONTH=${this.state.startDate.getMonth()+1};BYMONTHDAY=${this.state.startDate.getDate()}\r\n`;
                    }
                } else {
                    if (this.state.recurrIsChecked) {
                        str = `${el}:FREQ=${newEvent[el]};UNTIL=${time.year}${months[time.month]}${time.day}T000000Z\r\n`;
                    } else {
                        str = `${el}:FREQ=${newEvent[el]}\r\n`;
                    }
                }
                event.push(this.foldLine(str));
                continue;
            }
            if (el.match(/BEGIN[0-9]/)) {
                str = `BEGIN:${newEvent[el]}\r\n`;
                event.push(str);
                continue;
            }
            if (el.match(/END[0-9]/)) {
                str = `END:${newEvent[el]}\r\n`;
                event.push(str);
                continue;
            }
            if (el.match('DTSTAMP')) {
                const time = this.timeFormat(str, this.state.stamp);
                str = `${el}:${time.year}${months[time.month]}${time.day}T${time.hours}${time.minutes}${time.seconds}Z\r\n`;
                console.log(str);
                event.push(str);
                continue;
            }
            if (el.match('ORGANIZER')) {
                if (newEvent[el] === '') { continue; }
                str = `${el};SENT-BY="mailto:${newEvent[el]}":mailto:${newEvent[el]}\r\n`
                event.push(this.foldLine(str));
                continue;
            }
            if (el.match('ATTENDEE')) {
                newEvent[el].forEach((x,i) => {
                    if (newEvent[el][i].mailto === '') {
                    } else {
                        str = `${el};PARTSTAT=${newEvent[el][i].participationStatus};ROLE=${newEvent[el][i].participationRole};RSVP=${newEvent[el][i].rsvp}:mailto:${newEvent[el][i].mailto}\r\n`;
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
                    <DatePicker selected={this.state.startDate}
                                onChange={date => this.handleChange(date)}
                                showTimeSelect
                                timeIntervals={15}
                                timeCaption="Time"
                                dateFormat="MMMM d, yyyy h:mm aa" />
                    <DatePicker selected={this.state.endDate}
                                onChange={date => this.handleChange2(date)}
                                showTimeSelect
                                timeIntervals={15}
                                timeCaption="Time"
                                dateFormat="MMMM d, yyyy h:mm aa" />
                    <Timezone name='timezone' />
                    <Recurrence name='recurrenceFreq' 
                                selected={this.state.recurrenceDate} 
                                recur={this.state.recurrenceFreq} 
                                date={date => this.handleRecurrenceDate(date)}
                                freq={this.handleRecurrenceFreq}
                                startDate={this.state.startDate}
                                checked={this.handleRecurrenceChkBx}
                                isChecked={this.state.recurrIsChecked}
                                errMsg={this.state.errors.recurErrMsg} />
                    <DescriptionInput name='description' limitCounter={this.handleCharLimit} counted={this.state.desCharCounter} />
                    <LocationInput name='location' />
                    <Classification name='classification' />
                    <PriorityInput name='priority' />
                    <OrganizerInput name='organizer' errMsg={this.state.errors.emailErrMsg} />
                    <Attendees attendees={this.state.attendees} 
                               numAttendees={this.state.attendeesNum} 
                               handleNumAttendees={this.handleNumAttendees} 
                               errMsg={this.state.errors.attendeeErrMsg} />
                    <ResourcesInput name='resources' />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
      }
}

export default Form;