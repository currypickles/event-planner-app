import React, { Component } from 'react';
import TitleInput from '../Input/TitleInput';
import Timezone from '../Input/Timezone';
import DescriptionInput from '../Input/DescriptionInput';
import LocationInput from '../Input/LocationInput';
import GeoInput from '../Input/GeoInput';
import Classification from '../Input/Classification';
import PriorityInput from '../Input/PriorityInput';
import Attendees from '../Input/Attendees/Attendees';
import OrganizerInput from '../Input/OrganizerInput';
import ResourcesInput from '../Input/ResourcesInput';
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
        errors: {
            titleErrMsg: '',
            emailErrMsg: '',
            attendeeErrMsg: ''
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

    handleCharLimit = (event) => {
        this.setState({ [event.target.id]: event.target.value.length });
    }

    // handleGeoFormat = (event) => {
    //     var latlon = event.target.value.split(';');
    //     this.setState({geo: {lat: latlon[0], lon:latlon[1]}});
    // }

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

        /* time.num_hours = parseInt(time.hours);
        switch (this.state.timezone) {
            case 'HST':
                time.num_hours = time.num_hours + 10;
                break;
            case 'GMT-7':
                time.num_hours = time.num_hours + 7;
                break;
            default:
        }
        if (time.hours < 0) {
            time.hours += 24;
        } else if (time.hours > 24) {
            time.hours -= 24;
        }
        time.hours = time.num_hours.toString();
        if (time.hours.length === 1) {
            let zero = '0';
            time.hours = zero + time.hours;
        } */

        time.minutes = str.substr(15, 2);
        time.seconds = str.substr(18, 2);
        return time;
    }

    validateForm(name, email, attendee) {
        const validEmailRegex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
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
        return errors;
    }

    downloadTxtFile = (e) => {
        e.preventDefault();

        const errors = this.validateForm(this.state.titleInput, this.state.organizer, this.state.attendees.map(x => x.mailto));
        if (errors.hasOwnProperty('titleErrMsg') || errors.hasOwnProperty('emailErrMsg') || errors.hasOwnProperty('attendeeErrMsg')) {
            this.setState({ errors });
            console.log(errors)
            return;
        }

        var latlon = this.state.geo.split(';');
        var myLat = parseFloat(latlon[0]);
        var myLon = parseFloat(latlon[1]);
        this.setState({geo: {lat: myLat, lon: myLon}});



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
            CLASS: this.state.classification,
            SUMMARY: this.state.titleInput,
            DESCRIPTION: this.state.description.replace(/\n/gi,'\\n'),
            LOCATION: this.state.location,
            GEO: this.state.geo,
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
                let seconds, minutes, hours, num_hours, month, day, year;
                console.log(newEvent[el].toString());
                str = newEvent[el].toString().substr(4,20);
                month = str.substr(0,3);
                day = str.substr(4,2);
                year = str.substr(7,4);

                hours = str.substr(12, 2);
                num_hours = parseInt(hours);
                // switch (this.state.timezone) {
                //     case 'Pacific/Honolulu':
                //         num_hours = num_hours + 10;
                //         break;
                //     case 'America/New_York':
                //         num_hours = num_hours + 7;
                //         break;
                //     default:
                // }
                // if (hours < 0) {
                //     hours += 24;
                // } else if (hours > 24) {
                //     hours -= 24;
                // }
                // hours = num_hours.toString();
                // if (hours.length === 1) {
                //     let zero = '0';
                //     hours = zero + hours;
                // }

                minutes = str.substr(15, 2);
                seconds = str.substr(18, 2);
                console.log("Before 1: " + newEvent[el]);
                console.log("Before 2: " + el);
                str = `${el};TZID=${this.state.timezone}:${year}${months[month]}${day}T${hours}${minutes}${seconds}Z\r\n`;
                // str = `DTSTART;TZID=${this.state.timezone}:${year}${months[month]}${day}T${hours}${minutes}${seconds}Z\n`;
                // str = `${el}:${year}${months[month]}${day}T${hours}${minutes}${seconds}Z\n`
                // str = `BEGIN:${newEvent[el]}\r\n`;
                console.log(str);
                event.push(str);
                continue;
            }
            if(el.match('DTEND')) {
                let seconds2, minutes2, hours2, num_hours2, month2, day2, year2;
                console.log(newEvent[el].toString());
                str = newEvent[el].toString().substr(4,20);
                month2 = str.substr(0,3);
                day2 = str.substr(4,2);
                year2 = str.substr(7,4);

                hours2 = str.substr(12, 2);
                num_hours2 = parseInt(hours2);
                // switch (this.state.timezone) {
                //     case 'Pacific/Honolulu':
                //         num_hours2 = num_hours2 + 10;
                //         break;
                //     case 'America/New_York':
                //         num_hours2 = num_hours2 + 7;
                //         break;
                //     default:
                // }
                // if (hours2 < 0) {
                //     hours2 += 24;
                // } else if (hours2 > 24) {
                //     hours2 -= 24;
                // }
                // hours2 = num_hours2.toString();
                // if (hours2.length === 1) {
                //     let zero = '0';
                //     hours2 = zero + hours2;
                // }

                minutes2 = str.substr(15, 2);
                seconds2 = str.substr(18, 2);
                str = `${el};TZID=${this.state.timezone}:${year2}${months[month2]}${day2}T${hours2}${minutes2}${seconds2}Z\r\n`;
                //str = `${el}:${year2}${months[month2]}${day2}T${hours2}${minutes2}${seconds2}Z\n`
                console.log(str);
                event.push(str);
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
                str = `${el}: ${time.year}${months[time.month]}${time.day}T${time.hours}${time.minutes}${time.seconds}Z\r\n`;
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
                    <DescriptionInput name='description' limitCounter={this.handleCharLimit} counted={this.state.desCharCounter}/>
                    <LocationInput name='location' />
                    <GeoInput name='geo' />
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