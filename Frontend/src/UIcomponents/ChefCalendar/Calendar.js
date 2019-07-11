import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import DayPicker from 'react-day-picker';
import DatePicker, {setHours, setMinutes} from 'react-datepicker'
import 'react-day-picker/lib/style.css';
import 'react-datepicker/dist/react-datepicker.css'

export class Calendar extends Component {

    constructor(props) {
        super(props);
        this.handleDayClick = this.handleDayClick.bind(this);
        this.state = {
          selectedDay: undefined,
        };
      }

    handleDayClick(day, { selected }) {
        if (selected) {
          // Unselect the day if already selected
          this.setState({ selectedDay: undefined });
          return;
        }
        this.setState({ selectedDay: day });
      }

      
    render() {
        return (
            <div className="md-grid" id="calendarBox" label="Calendar" style={{width: '15%', background: 'white'}}>
                
                <div>
                    <DayPicker onDayClick={this.handleDayClick} selectedDays={this.state.selectedDay}/>
                    {this.state.selectedDay ? (
                    <h3 style = {{textAlign: 'center'}}>{this.state.selectedDay.toLocaleDateString()}</h3>
                    ) : (
                    <h3 style = {{textAlign: 'center'}}>Please select a day.</h3>
                    )}
                </div>

                <div>
                    <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleChange}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    dateFormat="h:mm aa"
                    timeCaption="Time"
                />
                </div>

            </div>
        )
    }
}

export default withRouter(Calendar);

/*modifiers={{
                    thursdays: { daysOfWeek: [4] }}}
                modifiersStyles={{thursdays: {
                    color: '#ffc107',
                    backgroundColor: '#fffdee',
                  }}}
                */
