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
        this.disabledHoursForStartTime = this.disabledHoursForStartTime.bind(this);
        this.disabledHoursForEndTime = this.disabledHoursForEndTime.bind(this);
        this.state = {
          selectedDay: undefined,
          startTime: null,
          endTime: null,
          disabledStartTime: [0,3,6,21],
          disabledEndTime: [0,3,6,9]
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

    onChangeStartTime = time => {
      this.setState({ startTime: time });
    };

    onChangeEndTime = time => {
      this.setState({ endTime: time });
    };

    handleSubmit(event) {
      event.preventDefault();

      let calendarBooking = this.props.calendarBooking;
        if (calendarBooking == undefined) {
          calendarBooking = {};
        }

      calendarBooking.reviewerName = "Ingo Glaser";
      calendarBooking.chefName = "Michael Scott";
      calendarBooking.selectedDay = this.state.selectedDay.toLocaleDateString();
      calendarBooking.startTime = "" + this.state.startTime.get('hour') + ":00";
      calendarBooking.endTime = "" + this.state.endTime.get('hour') + ":00";;

      this.setState({ selectedDay: undefined });
      this.setState({ startTime: null });
      this.setState({ endTime: null });

      this.props.onSubmit(calendarBooking);
    }

    

    disabledHoursForStartTime() {
      return this.state.disabledStartTime
    }

    disabledHoursForEndTime() {
      return this.state.disabledEndTime
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
                value = {this.state.startTime}
                onChange = {this.onChangeStartTime}
                hideDisabledOptions = {true}
                disabledHours = {this.disabledHoursForStartTime}
                minuteStep = {60}
                hourStep = {3}
                placeholder='Pick a time' />
                </div>

                   
                <div style = {{marginLeft: '20%'}}>   
                <h4 style = {{marginTop: '10%'}}>to</h4> 
                <TimePicker
                size="large"
                format = 'HH:mm'
                value = {this.state.endTime}
                onChange = {this.onChangeEndTime}
                hideDisabledOptions = {true}
                disabledHours = {this.disabledHoursForEndTime}
                minuteStep = {60}
                hourStep = {3}
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

