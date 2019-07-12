import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import DayPicker from 'react-day-picker';
import { TimePicker } from 'antd';
import moment from 'moment';
import 'antd/es/time-picker/style/css'
import 'react-day-picker/lib/style.css';
import 'react-datepicker/dist/react-datepicker.css'

export class Calendar extends Component {

    constructor(props) {
        super(props);
        this.handleDayClick = this.handleDayClick.bind(this);
        this.state = {
          selectedDay: undefined,
          startTime: moment().date()
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
                    {this.state.selectedDay ? 
                    (<h3 style = {{textAlign: 'center'}}>{this.state.selectedDay.toLocaleDateString()}</h3>) : 
                    (<h3 style = {{textAlign: 'center'}}>Choose a day above</h3>)}
                </div>

                
                <div style = {{marginLeft: '20%'}}> 
                <h4>from</h4>
                <TimePicker
                size="large"
                format = 'HH:mm'
                minuteStep = {30}
                placeholder='Pick a time' />
                </div>

                   
                <div style = {{marginLeft: '20%'}}>   
                <h4 style = {{marginTop: '10%'}}>to</h4> 
                <TimePicker
                size="large"
                format = 'HH:mm'
                minuteStep = {30}
                placeholder='Pick a time' />
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
