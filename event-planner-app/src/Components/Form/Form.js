import React, { Component } from 'react';
import TitleInput from '../Input/TitleInput';
import Timezone from '../Input/Timezone';
import DescriptionInput from '../Input/DescriptionInput';
import LocationInput from '../Input/LocationInput';
// import GeoInput from '../Input/GeoInput';
import Dates from '../Input/Dates';
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
    // constructor() {
    //     super();
    //     this.parentChange = this.parentChange.bind(this);
    //     this.parentChange2 = this.parentChange2.bind(this);
    //     this.state = {
    //         titleInput: '',
    //             timezone: 'Pacific/Honolulu',
    //             timezoneOffsetFrom: -1000,
    //             timezoneOffsetTo: -1000,
    //             timezoneName: 'HST',
    //             timezoneStart: '19700101T000000',
    //             startDate: new Date(),
    //             endDate: new Date(),
    //             stamp: new Date(),
    //             titleCharCounter: 0,
    //             description: '',
    //             location: '',
    //             geo: { lat: 0, lon: 0 },
    //             desCharCounter: 0,
    //             classification: 'PUBLIC',
    //             priority: '0',
    //             attendees: [],
    //             organizer: '',
    //             resources: '',
    //             recurrenceFreq: 'ONCE',
    //             recurrenceDate: new Date(),
    //             errors: {
    //                 titleErrMsg: '',
    //                 emailErrMsg: '',
    //                 attendeeErrMsg: ''
    //             }
    //     };
    // }
    //
    // parentChange(startDate) {
    //     if (startDate > this.state.endDate) {
    //         this.setState({endDate: startDate})
    //     }
    //     this.setState({
    //         startDate: startDate
    //     });
    // };
    //
    // parentChange2 (startDate){
    //     if (startDate < this.state.startDate) {
    //         startDate = this.state.startDate
    //     }
    //     this.setState({
    //         endDate: startDate
    //     });
    // };

    state = {
        titleInput: '',
        timezone: 'Pacific/Honolulu',
        timezoneOffsetFrom: 0,
        timezoneOffsetTo: -1000,
        timezoneName: 'HST',
        timezoneStart: '19700101T000000',
        startDate: new Date(),
        endDate: new Date(),
        minStart: new Date(),
        
        maxStart: {},
        minEnd: new Date(),
        maxEnd: '',
        stamp: new Date(),
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
        recurrenceDate: new Date(),
        errors: {
            titleErrMsg: '',
            emailErrMsg: '',
            attendeeErrMsg: ''
        }
    };

    handleChange = date => {
        console.log("Changing start date");
        if (date > this.state.endDate) {
            this.setState({endDate: date})
        }
        this.setState({
            startDate: date
        });


        let return_val = this.state.startDate;

        let now = new Date();
        let today = now.getDay();
        let start_day = this.state.startDate.getDay();


        if (start_day > today) {

            return_val.setHours(0);
            return_val.setMinutes(0);

            this.setState({
                minStart: return_val
            });
        }
        else {
            this.setState({
                minStart: now
            });
        }

    };

    handleChange2 = date => {
        if (date < this.state.startDate) {
            date = this.state.startDate
        }
        this.setState({
            endDate: date
        });


        let return_val = this.state.startDate;

        let start_day = this.state.startDate.getDay();
        let end_day = this.state.endDate.getDay();

        if (end_day > start_day) {

            return_val.setHours(0);
            return_val.setMinutes(0);

            this.setState({
                minEnd: return_val
            });
        }
        else {
                this.setState({
                    minStart: this.state.startDate
                });
            }
        };

    // handleTiming = () => {
    //     console.log("hello");
    //
    //     let return_val = this.state.startDate;
    //
    //     let now = new Date();
    //     let today = now.getDay();
    //     let start_day = this.state.startDate.getDay();
    //
    //
    //     if (start_day > today) {
    //         return_val.setHours(0);
    //         return_val.setMinutes(0);
    //     }
    //
    //     console.log("Starting min: "+return_val);
    //     return return_val
    // };

    // handleTiming2 = () => {
    //     console.log("hello2");
    //     let return_val = this.state.startDate;
    //
    //     let start_day = this.state.startDate.getDay();
    //     let end_day = this.state.endDate.getDay();
    //
    //     if (end_day > start_day) {
    //         return_val.setHours(0);
    //         return_val.setMinutes(0);
    //     }
    //
    //     console.log("Ending min: "+return_val);
    //     return return_val
    // };

    // handleMax = () => {
    //     let d = this.state.startDate;
    //     d.setHours(23);
    //     d.setMinutes(59);
    //
    //     console.log("Starting max: "+ d);
    //
    //     return d;
    // };
    //
    // handleMax2 = () => {
    //     let d = this.state.endDate;
    //     d.setHours(23);
    //     d.setMinutes(59);
    //
    //     console.log("Ending max: " + d);
    //
    //     return d;
    // };



    handleTimezone = (event) => {
        console.log("I was here");
        const timezoneOffsets = {
            Hawaii: -1000,
            New_York: { daylight: -400, standard: -500 }
        };
        const timezoneNames = {
            Hawaii: 'HST',
            New_York: { daylight: 'EDT', standard: 'EST' }
        };
        const timezoneStarts = {
            Hawaii: '19700101T000000',
            New_York: { daylight: '19700308T020000', standard: '19701101T020000' }
        };

        switch (event) {
            case 'Pacific/Honolulu':
                this.setState({
                    timezoneOffsetFrom: timezoneOffsets.Hawaii,
                    timezoneOffsetTo: timezoneOffsets.Hawaii,
                    timezoneName : timezoneNames.Hawaii,
                    timezoneStart: timezoneStarts.Hawaii
                });
                break;
            case 'America/New_York':
                this.setState({
                    timezoneOffsetFrom: timezoneOffsets.New_York.daylight,
                    timezoneOffsetTo: timezoneOffsets.New_York.standard,
                    timezoneName: timezoneNames.New_York.standard,
                    timezoneStart: timezoneStarts.New_York.standard
                });
                break;
            default:
        }
    };

    handleRecurrenceDate = date => {
        this.setState({ recurrenceDate: date });
    }

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

        // var latlon = this.state.geo.split(';');
        // var myLat = parseFloat(latlon[0]);
        // var myLon = parseFloat(latlon[1]);
        // this.setState({geo: {lat: myLat, lon: myLon}});



        const newEvent = {
            BEGIN: 'VCALENDAR',
            BEGIN3: 'VTIMEZONE',
            TZID: this.state.timezone,
            BEGIN4: 'STANDARD',
            TZOFFSETFROM: this.state.timezoneOffsetFrom,
            TZOFFSETTO: this.state.timezoneOffsetTo,
            TZNAME: this.state.timezoneName,
            ZONE_START: this.state.timezoneStart,
            END4: 'STANDARD',
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
            // GEO: this.state.geo,
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
                str = `${el};TZID=${this.state.timezone}:${year}${months[month]}${day}T${hours}${minutes}${seconds}\r\n`;
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
                str = `${el};TZID=${this.state.timezone}:${year2}${months[month2]}${day2}T${hours2}${minutes2}${seconds2}\r\n`;
                //str = `${el}:${year2}${months[month2]}${day2}T${hours2}${minutes2}${seconds2}Z\n`
                console.log(str);
                event.push(str);
                continue;
            }
            if (el.match('RRULE')) {
                if (newEvent[el] === 'ONCE') { continue; }
                const time = this.timeFormat(str, this.state.recurrenceDate);
                if (newEvent[el] === 'MONTHLY') { 
                    str = `${el}:FREQ=${newEvent[el]};UNTIL=${time.year}${months[time.month]}${time.day}T${time.hours}${time.minutes}${time.seconds}Z;BYMONTHDAY=${time.day}\r\n`;
                } else if (newEvent[el] === 'YEARLY') {
                    str = `${el}:FREQ=${newEvent[el]};UNTIL=${time.year}${months[time.month]}${time.day}T${time.hours}${time.minutes}${time.seconds}Z;BYMONTH=${months[time.month]};BYMONTHDAY=${time.day}\r\n`;
                } else {
                    str = `${el}:FREQ=${newEvent[el]};UNTIL=${time.year}${months[time.month]}${time.day}T${time.hours}${time.minutes}${time.seconds}Z\r\n`;
                }
                event.push(this.foldLine(str));
                continue;
            }
            if (el.match(/BEGIN[0-9]/)) {
                str = `BEGIN:${newEvent[el]}\r\n`;
                event.push(str);
                continue;
            }

            if (el.match('ZONE_START')) {
                str = `DTSTART:${newEvent[el]}\r\n`;
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
                    {/*<Dates methodfromparent={this.parentChange}*/}
                    {/*       minDay={new Date()}*/}
                    {/*       minTiming={new Date()}*/}
                    {/*/>*/}
                    {/*<Dates methodfromparent={this.parentChange2}*/}
                    {/*       minDay={this.state.startDate}*/}
                    {/*       minTiming={this.state.startDate}*/}
                    {/*/>*/}
                    {/*<DatePicker selected={this.state.startDate}*/}
                    {/*            onChange={date => this.handleChange(date)}*/}
                    {/*            minDate = {new Date()}*/}
                    {/*            showTimeSelect*/}
                    {/*            timeIntervals={15}*/}
                    {/*            timeCaption="Time"*/}
                    {/*            dateFormat="MMMM d, yyyy h:mm aa" />*/}
                    {/*<DatePicker selected={this.state.endDate}*/}
                    {/*            onChange={date => this.handleChange2(date)}*/}
                    {/*            minDate = {this.state.startDate}*/}
                    {/*            showTimeSelect*/}
                    {/*            timeIntervals={15}*/}
                    {/*            timeCaption="Time"*/}
                    {/*            dateFormat="MMMM d, yyyy h:mm aa" />*/}
                    <Dates selected={this.state.startDate}
                           date={date => this.handleChange(date)}
                           minDay={new Date()}
                           minTiming={this.state.minStart}
                           maxTiming={this.state.maxStart}
                           //minTiming={new Date()}
                           />
                    <Dates selected={this.state.endDate}
                           date={date => this.handleChange2(date)}
                           minDay={this.state.startDate}
                           minTiming={this.state.minEnd}
                           maxTiming={this.state.maxEnd}
                           />
                    <Timezone name='timezone' select={this.handleTimezone}/>
                    <Recurrence name='recurrenceFreq' 
                                selected={this.state.recurrenceDate} 
                                recur={this.state.recurrenceFreq} 
                                date={date => this.handleRecurrenceDate(date)} />
                    <DescriptionInput name='description' limitCounter={this.handleCharLimit} counted={this.state.desCharCounter} />
                    <LocationInput name='location' />
                    {/*<GeoInput name='geo' />*/}
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