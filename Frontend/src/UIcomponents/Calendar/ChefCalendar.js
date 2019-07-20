import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import DayPicker from 'react-day-picker';
import { TimePicker } from 'antd';
import 'antd/es/time-picker/style/css'
import 'react-day-picker/lib/style.css';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

export class ChefCalendar extends Component {

    constructor(props) {
        super(props);
        this.handleDayClick = this.handleDayClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.range = this.range.bind(this);
        this.disabledHours = this.disabledHours.bind(this);
        this.state = {
          selectedDay: undefined,
          startTime: null,
          endTime: null,
          defaultOpenValueStartTime: moment(new Date().setHours(8)),
          defaultOpenValueEndTime: moment(new Date().setHours(9))
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
      this.setState({ endTime: null });
      this.setState({ startTime: time });
    };

    onChangeEndTime = time => {
      this.setState({ endTime: time });
    };

    handleSubmit(event) {
      event.preventDefault();

      if(this.state.selectedDay == undefined || 
        this.state.startTime == null ||
        this.state.endTime == null ||
        this.state.startTime >= this.state.endTime) {
          alert("Please make sure you selected a day, valid start and end time")
      }

      else {
        let convertedStartTime = this.state.startTime.toDate();
        let convertedEndTime = this.state.endTime.toDate();
        let workTime = this.props.workTime;
          if (workTime == undefined) {
            workTime = {};
          }
        
        //Fetching Date from DatePicker and adding it to startTime/endTime timeStamp 
        convertedStartTime.setDate(this.state.selectedDay.getDate());
        convertedStartTime.setMonth(this.state.selectedDay.getMonth());
        convertedStartTime.setFullYear(this.state.selectedDay.getFullYear());

        convertedEndTime.setDate(this.state.selectedDay.getDate());
        convertedEndTime.setMonth(this.state.selectedDay.getMonth());
        convertedEndTime.setFullYear(this.state.selectedDay.getFullYear());
        
        let existingWorktimes = this.props.workTimes.filter(workTime => 
          new Date(parseInt(workTime.startTime)).toLocaleDateString() === convertedStartTime.toLocaleDateString())

        console.log(existingWorktimes)

        let entryIsValid = true;
        for(var i = 0; i < existingWorktimes.length; i++){
          let existingStartime = new Date(parseInt(existingWorktimes[i].startTime)).getHours()
          let existingEndtime = new Date(parseInt(existingWorktimes[i].endTime)).getHours()

          if((convertedStartTime.getHours() <  existingEndtime && convertedStartTime.getHours() >= existingStartime)
              || convertedStartTime.getHours() == existingStartime 
              || convertedEndTime.getHours() == existingEndtime
              || (convertedEndTime.getHours() > existingStartime && convertedEndTime.getHours() < existingEndtime)
              || (convertedStartTime.getHours() > existingStartime && convertedStartTime < existingEndtime)) {
            alert("Your entry is invalid, an existing worktime is collidining. Please delete the colliding worktime.")
            entryIsValid = false;
          }
        }

        if(entryIsValid){
          workTime.chefName = "Michael Scott";
          workTime.startTime = convertedStartTime.valueOf();
          workTime.endTime = convertedEndTime.valueOf();
          this.setState({ selectedDay: undefined });
          this.setState({ startTime: null });
          this.setState({ endTime: null });
          this.props.onSubmit(workTime);
          window.location.reload();
        }
        
      }
    }

    range(start, end) {
      let array = [...Array(end+1).keys()];
      return array.filter(element => element >= start);
    }

    disabledHours(){
      if (this.state.startTime != null) {
        return this.range(0,(this.state.startTime).toDate().getHours());
      }
      return []
    }

    render() {
        return (
            <div className="md-grid" id="calendarBox" label="ChefCalendar" style={{width: '17.5%', background: 'white'}}>
                
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
                defaultOpenValue = {this.state.defaultOpenValueStartTime}
                onChange = {this.onChangeStartTime}
                minuteStep = {60}
                hourStep = {1}
                placeholder='Pick a time' />
                </div>

                   
                <div style = {{marginLeft: '20%'}}>   
                <h4 style = {{marginTop: '10%'}}>to</h4> 
                <TimePicker
                size="large"
                format = 'HH:mm'
                value = {this.state.endTime}
                onChange = {this.onChangeEndTime}
                defaultOpenValue = {this.state.defaultOpenValueEndTime}
                disabledHours = {this.disabledHours}
                minuteStep = {60}
                hourStep = {1}
                placeholder='Pick a time' />

                <form onSubmit={this.handleSubmit}>
                <input type="submit" value="Submit" style={{
                            marginTop: '20%',
                            marginLeft: '-25%',
                            marginBottom: '10%',
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

export default withRouter(ChefCalendar);

