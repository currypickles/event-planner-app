import React, { Component } from 'react';
import './App.css';
class App extends Component {
    state = {
        titleInput: '',
        startDate: new Date(),
        endDate: new Date(),
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

    handleStartDate = (event) => {
        this.setState({
            startDate: event.target.value,
        });
    };
    handleEndDate = (event) => {
        this.setState({
            endDate: event.target.value
        });
    };

    handleSubmit(event) {
        if (this.state.startDate > this.state.endDate){
            throw new Error('Invalid Input!');
    }
        else{
            this.downloadTxtFile()
        }
}

    downloadTxtFile = () => {
        const newEvent = {
            BEGIN: 'VCALENDAR',
            VERSION: '2.0',
            PRODID: 'www.website.com',
            BEGIN2: 'VEVENT',
            DTSTAMP: '2020026T230518Z',
            UID: '20200215T230518Z-1655380985@test.com',
            DTSTART: this.state.startDate,
            DTEND: this.state.endDate,
            SUMMARY: this.state.titleInput,
            DESCRIPTION: this.state.description,
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
        <div className='post'>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label>Title:
                <input onChange={this.handleTitle} />
              </label>
            </div>
            <div>
               <label>Start Time:
                   <input onChange={this.handleStartDate} />
               </label>
            </div>
            <div>
                <label>End Time:
                    <input onChange = {this.handleEndDate} />
                </label>
            </div>
            <div>
              <label>Description:
                <textarea onChange={this.handleDescription} />
              </label>
            </div>
            <input type="submit" value="Submit" />
          </form>
        </div>
      );
    }
}
export default App;
