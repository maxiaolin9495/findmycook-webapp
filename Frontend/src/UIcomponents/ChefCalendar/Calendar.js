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
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
          id : Math.floor((Math.random() * 100000000) + 1).toString(),
          selectedDay: undefined,
          startTime: moment().date(),
          endTime: moment().date()
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

    handleSubmit(event) {
      alert('Booking Confirmed');
      event.preventDefault();

      let booking = this.props.booking;
        if (booking == undefined) {
          booking = {};
        }
      booking.id = this.state.id;
      booking.selectedDay = this.state.selectedDay;
      booking.startTime = this.state.startTime;
      booking.endTime = this.state.endTime;
      this.setState({ selectedDay: undefined });
      this.setState({ startTime: undefined });
      this.setState({ endTime: undefined });
      this.props.onSubmit(booking);
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

                <form onSubmit={this.handleSubmit}>
                <input type="submit" value="Book" style={{
                            marginTop: '20%',
                            marginLeft: '-25%',
                            width: '180%',
                            lineHeight: '25px',
                            fontSize: '16px',
                            backgroundColor: 'rgb(69,150,236)',
                            color: 'white'
                        }}/>
                </form>
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
