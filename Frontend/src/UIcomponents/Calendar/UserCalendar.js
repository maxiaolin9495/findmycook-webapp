import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import DayPicker from 'react-day-picker';
import { TimePicker } from 'antd';
import 'antd/es/time-picker/style/css'
import 'react-day-picker/lib/style.css';
import 'react-datepicker/dist/react-datepicker.css'
import PaymentDialog from "../Booking/PaymentDialog";

export class UserCalendar extends Component {

    constructor(props) {
        super(props);
        this.handleDayClick = this.handleDayClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.disabledHoursForStartTime = this.disabledHoursForStartTime.bind(this);
        this.disabledHoursForEndTime = this.disabledHoursForEndTime.bind(this);
        //this.updateDisabledStartTimes =  this.updateDisabledStartTimes.bind(this);
        //this.updateDisabledEndTimes = this.updateDisabledEndTimes.bind(this);
        //this.filterCalendarBookingsPerDay = this.filterCalendarBookingsPerDay.bind(this);
        
        this.state = {
          selectedDay: undefined,
          startTime: null,
          endTime: null,
          fixedDisabledStartTimes: [0,3,6,21],
          fixedDisabledEndTimes: [0,3,6,9],
          disabledStartTimesList: [],
          disabledEndTimesList: []
        };
    }

    handleDayClick(day, { selected }) {
        if (selected) {
          // Unselect the day if already selected
          this.setState({ selectedDay: undefined });
          return;
        }
        this.setState({ selectedDay: day });
        //this.updateDisabledStartTimes();
        //this.updateDisabledEndTimes();
    }

    /*
    filterCalendarBookingsPerDay(){
      let filteredCalendarBookings = this.props.userCalendarBookings.filter(userCalendarBooking => {
        return userCalendarBooking.selectedDay === (this.state.selectedDay.toLocaleDateString());
      });
      
      return filteredCalendarBookings
    }

    updateDisabledStartTimes() {
      let disabledStartTimesList = this.filterCalendarBookingsPerDay().map(userCalendarBooking => {
        return Number(parseInt(userCalendarBooking.startTime, 10));
      });
      
      this.setState({ disabledStartTimesList: disabledStartTimesList.concat(this.state.fixedDisabledStartTimes)});
    }

    updateDisabledEndTimes() {
      let disabledEndTimesList = this.filterCalendarBookingsPerDay().map(userCalendarBooking => {
        return Number(parseInt(userCalendarBooking.endTime, 10));
      });
      
      this.setState({ disabledEndTimesList: disabledEndTimesList.concat(this.state.fixedDisabledEndTimes) });
    }*/

    onChangeStartTime = time => {
      this.setState({ startTime: time });
    };

    onChangeEndTime = time => {
      this.setState({ endTime: time });
    };

    handleSubmit() {
      let userCalendarBooking = {};

      //Fetching Date from DatePicker and adding to startTime/endTime timeStamp 
      let convertedStartTime = this.state.startTime.toDate();
      let convertedEndTime = this.state.endTime.toDate();
      convertedStartTime.setDate(this.state.selectedDay.getDate());
      convertedStartTime.setMonth(this.state.selectedDay.getMonth());
      convertedStartTime.setFullYear(this.state.selectedDay.getFullYear());
      convertedStartTime.setSeconds(0);
      convertedEndTime.setDate(this.state.selectedDay.getDate());
      convertedEndTime.setMonth(this.state.selectedDay.getMonth());
      convertedEndTime.setFullYear(this.state.selectedDay.getFullYear());
      convertedEndTime.setSeconds(0);
      
      userCalendarBooking.startTime = convertedStartTime.valueOf();
      userCalendarBooking.endTime = convertedEndTime.valueOf();

      this.props.onSubmit(userCalendarBooking);
    }

    disabledHoursForStartTime() {
      return this.state.disabledStartTimesList
    }

    disabledHoursForEndTime() {
      return this.state.disabledEndTimesList
    }

    render() {
        return (
            <div className="md-grid" id="calendarBox" label="UserCalendar" style={{width: '15%', background: 'white'}}>
                
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

                <PaymentDialog price={this.props.price} handleSubmit={this.handleSubmit} onSubmit={this.handleSubmit}>
                </PaymentDialog>
                </div>

                


            </div>
        )
    }
}

export default withRouter(UserCalendar);

