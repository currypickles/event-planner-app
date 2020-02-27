import React, { Component } from 'react';
import './App.css';
class App extends Component {
    state = {
        titleInput: '',
    };
    handleTitle = (event) => {
        this.setState({
            titleInput: event.target.value,
        });
    };

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
            DESCRIPTION: 'Great event in your town',
            END2: 'VEVENT',
            END: 'VCALENDAR',
        }

        const event = [];
        for(let el in newEvent) {
            event.push(`${el}:${newEvent[el]}\n`);
        }

        event.forEach( (el,index) => {
            const [ first, second ] = el.split(':');
            if (first === 'BEGIN2') {
                event[index] = `BEGIN:${second}`;
            }
            if (first === 'END2') {
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
                <label>Title:
                  <input onChange={this.handleTitle} />
                </label>
                <input type="submit" value="Submit" />
              </form>
        </div>
    );
    }
}
export default App;
