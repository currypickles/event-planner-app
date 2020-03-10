import React, { Component } from 'react';
import TitleInput from '../Input/TitleInput';
import DescriptionInput from '../Input/DescriptionInput';
import Classification from '../Input/Classification';
import PriorityInput from '../Input/PriorityInput';

class Form extends Component {
    state = {
        titleInput: '',
        description: '',
        classification: 'PUBLIC',
        priority: '0'
    };

    handleFormControl = (event) => {
        this.setState({ [event.target.name]: event.target.value });
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

    downloadTxtFile = () => {
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
            DESCRIPTION: this.foldLine(this.state.description.replace(/\n/gi,'\\n')),
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
            event.push(`${el}:${newEvent[el]}\n`);
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
                    <TitleInput name='titleInput' />
                    <DescriptionInput name='description' />
                    <Classification name='classification' />
                    <PriorityInput name='priority' />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
      }
}

export default Form;