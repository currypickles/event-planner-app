import React, { Component } from 'react';
import TitleInput from '../Input/TitleInput';
import DescriptionInput from '../Input/DescriptionInput';

class Form extends Component {
    state = {
        titleInput: '',
        description: ''
    };

    handleTitle = (event) => {
        this.setState({
            titleInput: event.target.value,
        });
    };

    handleDescription = (event) => {
      this.setState({
          description: event.target.value,
      });
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
        return parts.join('\r\n\t');
    }

    downloadTxtFile = () => {
        const newEvent = {
            BEGIN: 'VCALENDAR',
            VERSION: '2.0',
            PRODID: 'www.website.com',
            BEGIN2: 'VEVENT',
            DTSTAMP: '2020026T230518Z',
            UID: '20200215T230518Z-1655380985@test.com',
            DTSTART: '20200227',
            DTEND: '20200228',
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
                <form onSubmit={this.downloadTxtFile}>
                    <TitleInput change={this.handleTitle} />
                    <DescriptionInput change={this.handleDescription} />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
      }
}

export default Form;