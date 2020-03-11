import React, { Component } from 'react';
import TitleInput from '../Input/TitleInput';
import DescriptionInput from '../Input/DescriptionInput';
import Classification from '../Input/Classification';
import PriorityInput from '../Input/PriorityInput';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class Form extends Component {
        state = {
            titleInput: '',
            startDate: new Date(),
            endDate: new Date(),
            description: '',
            classification: 'PUBLIC',
            priority: '0'
        };

    handleTitle = (event) => {
        this.setState({
            titleInput: event.target.value,
        });
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

    handleDescription = (event) => {
      this.setState({
          description: event.target.value,
      });
    };

    handleClassification = (event) => {
        this.setState({
            classification: event.target.value
        });
    };

    handlePriority = (event) => {
        this.setState({
            priority: event.target.value
        });
    };

    handleSubmit = (event) => {
        if (this.state.startDate > this.state.endDate){
            alert("Hello! I am an alert box!!");
        }
        else{
            this.downloadTxtFile()
        }
    }

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
        return parts.join('\r\n\t');
    }

    downloadTxtFile = () => {
        const newEvent = {
            BEGIN: 'VCALENDAR',
            VERSION: '2.0',
            PRODID: 'team-curry-pickles-iCal',
            BEGIN2: 'VEVENT',
            PRIORITY: this.state.priority,
            DTSTAMP: '2020026T230518Z',
            UID: Math.random().toString(), // Placeholder for now 
            DTSTART: this.state.startDate,
            DTEND: this.state.endDate,
            CLASS: this.state.classification,
            SUMMARY: this.state.titleInput,
            DESCRIPTION: this.foldLine(this.state.description.replace(/\n/gi,'\\n')),
            END2: 'VEVENT',
            END: 'VCALENDAR',
        }

        // Iterates over the newEvent object and puts each key and value into
        // an event array with the format - key:value as a string
        const event = [];
        for(let el in newEvent) {
            event.push(`${el}:${newEvent[el]}\n`);
        }

        // Iterates over the event array and removes any numerical value from 
        // the key BEGIN and END. 
        event.forEach( (el,index) => {
            const [ first, second ] = el.split(':');
            if (first.match(/BEGIN[0-9]/)) {
                event[index] = `BEGIN:${second}`;
            }
            if (first.match(/END[0-9]/)) {
                event[index] = `END:${second}`;
            }
        });  

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
                <form onSubmit={this.handleSubmit}>
                    <TitleInput change={this.handleTitle} />
                    <DatePicker selected={this.state.startDate}
                                onChange={date => this.handleChange(date)}
                                showTimeSelect
                                timeIntervals={15}
                                timeCaption="Time"
                                dateFormat="h:mm aa" />
                    <DatePicker selected={this.state.endDate}
                                onChange={date => this.handleChange2(date)}
                                showTimeSelect
                                timeIntervals={15}
                                timeCaption="Time"
                                dateFormat="h:mm aa" />
                    <DescriptionInput change={this.handleDescription} />
                    <Classification value={this.state.classification} change={this.handleClassification} />
                    <PriorityInput value={this.state.priority} change={this.handlePriority} />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
      }
}

export default Form;