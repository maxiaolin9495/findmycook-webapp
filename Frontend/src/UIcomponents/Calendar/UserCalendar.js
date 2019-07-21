import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import ChefCalendarService from '../../Services/ChefCalendarService';
import DayPicker, { DateUtils, ModifiersUtils } from 'react-day-picker';
import { TimePicker, Button } from 'antd';
import 'antd/es/time-picker/style/css'
import 'react-day-picker/lib/style.css';
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment';
import UserService from "../../Services/UserService";
import PaymentDialog from "../Booking/PaymentDialog";
import BookingService from "../../Services/BookingService";


const modifiers = {
  enabled: [],
  disabled: [],
  past: { 
    before: new Date(),
  }
};

const modifiersStyles = {
  enabled: {
    color: "white",
    backgroundColor: "green"
  },
  disabled: {
    color: "white",
    backgroundColor: "red"
  },
  past:{
    color: "rgb(230, 230, 230)",
    backgroundColor: "clear"
  }
};


export class UserCalendar extends Component {

    constructor(props) {
        super(props);
        this.handleDayClick = this.handleDayClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.computeDisabledHours = this.computeDisabledHours.bind(this);
        this.range = this.range.bind(this);
        this.disabledHoursStartTime = this.disabledHoursStartTime.bind(this);
        this.disabledHoursEndTime = this.disabledHoursEndTime.bind(this);
        this.disabledMinutes = this.disabledMinutes.bind(this);
        this.onDemandComputeDisabledHours = this.onDemandComputeDisabledHours.bind(this);
        this.onMonthChange = this.onMonthChange.bind(this);

        this.state = {
            chefWorkTimes: [],
            customerName: '',
            address: '',
            userCalendarBookings: [], //the user bookings returned by the backend
            userBookedTimesForStartTime: [], //user booking times as an array
            userBookedTimesForEndTime: [], //user booking times as an array
            selectedDay: null,
            month: new Date(),
            startTime: null,
            endTime: null,
            defaultOpenValueStartTime: moment(new Date()),
            defaultOpenValueEndTime: moment(new Date()),
            disabledHoursStartTime: [...Array(24).keys()],
            disabledHoursEndTime: [...Array(24).keys()]
        };
    }

    handleDayClick(day, {selected}) {
        if (selected) {
            // Unselect the day if already selected
            this.setState({selectedDay: undefined});
            return;
        }
        this.setState({startTime: null})
        this.setState({endTime: null})
        this.setState({selectedDay: day});
        this.computeDisabledHours(day);
        //console.log(day)
        //console.log("Month State:")
        //console.log(this.state.month.getMonth())
    }

    onChangeStartTime = time => {
        this.setState({startTime: time});
        this.computePossibleEndTimes(time);
    };

    onChangeEndTime = time => {
        this.setState({endTime: time});
    };

    disabledHoursStartTime() {
        return this.state.disabledHoursStartTime
    }

    identifyEndOfWorktime(chosenStartHour) {
        let worktimeSlot = this.state.chefWorkTimes.filter(workTime => chosenStartHour >= new Date(parseInt(workTime.startTime)).getHours() && chosenStartHour <= new Date(parseInt(workTime.endTime)).getHours())
        return new Date(parseInt(worktimeSlot[worktimeSlot.length - 1].endTime)).getHours()
    }

    computePossibleEndTimes(time) {
        let startTime = time

        // if start time value is set - adapt the computed disabled range to the selected start time as to avoid bridge booking
        if (startTime != null) {
            let startHour = startTime.toDate().getHours()

            //Get current bookings
            var disabledRangeResult = []
            var userBookedTimes = this.state.userBookedTimesForStartTime.sort(this.sortNumbers)

            //Disable values up to start value
            let temp_disabledRangeResult = this.range(0, startHour)
            temp_disabledRangeResult.forEach(element => {
                if (!disabledRangeResult.includes(element)) {
                    disabledRangeResult.push(element)
                }
            });
            disabledRangeResult = disabledRangeResult.sort((a, b) => (a > b) ? 1 : -1)
            //console.log("Disabled Range up to start time:")
            //console.log(disabledRangeResult)

            if (userBookedTimes.length != 0) {
                //Find next booking after selected start time and disable all open slots afterwards to avoid bridge booking
                //console.log("user booked times:")
                //console.log(userBookedTimes)
                //Find next booking after selected starting time
                var nextBookingStartTime = -1;
                for (var i = 0; i < userBookedTimes.length; i++) {
                    if (userBookedTimes[i] > startHour) {
                        nextBookingStartTime = userBookedTimes[i]
                        break;
                    }
                }
                //console.log("Next Booking")
                //console.log(nextBookingStartTime)
            }

            if (nextBookingStartTime != -1) {
                let temp_disabledRangeResult = this.range(nextBookingStartTime + 1, 23)
                //console.log("Temp Disabled Range")
                //console.log(temp_disabledRangeResult)
                temp_disabledRangeResult.forEach(element => {
                    if (!disabledRangeResult.includes(element)) {
                        disabledRangeResult.push(element)
                    }
                });
                //console.log("Disabled Range")
                //console.log(disabledRangeResult)
            }

            //identify end of work shift
            let endOfWorktime = this.identifyEndOfWorktime(startHour)
            //console.log("End of Shift")
            //console.log(endOfWorktime)
            temp_disabledRangeResult = this.range(endOfWorktime + 1, 23)
            temp_disabledRangeResult.forEach(element => {
                if (!disabledRangeResult.includes(element)) {
                    disabledRangeResult.push(element)
                }
            });
        }

        let sorted = disabledRangeResult.sort(this.sortNumbers)
        //console.log("Disabled Range considering worktime slot")
        //console.log(sorted)
        this.setState({disabledHoursEndTime: sorted})
    }

    disabledHoursEndTime() {
        return this.state.disabledHoursEndTime;
    }

    disabledMinutes() {
        if (this.state.disabledHoursStartTime.length >= 24) {
            return [0];
        } else {
            return [];
        }
    }

    handleSubmit() {


        if (this.state.selectedDay == undefined ||
            this.state.startTime == null ||
            this.state.endTime == null ||
            this.state.startTime >= this.state.endTime) {
            alert("Please make sure you selected a day, valid start and end time")
        }

        else {
            let userCalendarBooking = this.props.userCalendarBooking;
            if (userCalendarBooking == undefined) {
                userCalendarBooking = {};
            }

            userCalendarBooking.userName = this.state.customerName;
            userCalendarBooking.chefName = this.props.chef.firstName + ' ' + this.props.chef.lastName;
            userCalendarBooking.address = this.state.address;

            //Fetching Date from DatePicker and adding to startTime/endTime timeStamp
            let convertedStartTime = this.state.startTime.toDate();
            let convertedEndTime = this.state.endTime.toDate();
            convertedStartTime.setDate(this.state.selectedDay.getDate());
            convertedStartTime.setMonth(this.state.selectedDay.getMonth());
            convertedStartTime.setFullYear(this.state.selectedDay.getFullYear());
            convertedEndTime.setDate(this.state.selectedDay.getDate());
            convertedEndTime.setMonth(this.state.selectedDay.getMonth());
            convertedEndTime.setFullYear(this.state.selectedDay.getFullYear());

            userCalendarBooking.startTime = convertedStartTime.valueOf();
            userCalendarBooking.endTime = convertedEndTime.valueOf();
            userCalendarBooking.status = 'inProgress';
            this.setState({selectedDay: undefined});
            this.setState({startTime: null});
            this.setState({endTime: null});
            this.setState({disabledHoursStartTime: [...Array(24).keys()]});
            this.setState({disabledHoursEndTime: [...Array(24).keys()]});
            this.props.onSubmit(userCalendarBooking);
        }
    }

    componentWillReceiveProps(props) {
        let customerName = UserService.getCurrentUser();
        this.setState({address: customerName.address})
        ChefCalendarService.getWorkTimeEntries().then((chefWorkTimes) => {
            this.setState({chefWorkTimes: [...chefWorkTimes].filter(workTime => workTime.chefName === props.chef.firstName + ' ' + props.chef.lastName)});
            this.colorizeCalendar([...chefWorkTimes].filter(workTime => workTime.chefName === props.chef.firstName + ' ' + props.chef.lastName))
        }).catch((e) => {
            console.error(e);
        });
        console.log(props.chef);
        BookingService.getBookings('Chef',props.chef.email).then((userCalendarBookings) => {
            this.setState({
                userCalendarBookings: [...userCalendarBookings].filter(userCalendarBooking => userCalendarBooking.chefEmail === props.chef.email
                    && userCalendarBooking.status !== 'canceled')
            });
        }).catch((e) => {
            console.error(e);
        });
    }

    daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }

    onDemandComputeDisabledHours(selected, workTimes) {
        workTimes = workTimes.filter(workTime => new Date(parseInt(workTime.startTime)).toLocaleDateString() === selected.toLocaleDateString());
        let userCalendarBookings = this.state.userCalendarBookings.filter(userCalendarBooking => new Date(parseInt(userCalendarBooking.startTime)).toLocaleDateString() === selected.toLocaleDateString());

        console.log('Chef work times:')
        console.log(userCalendarBookings)
        if (workTimes.length == 0) {
            return [...Array(24).keys()];
        }

        var temp_userBookedTimesForStartTime = []
        var temp_userBookedTimesForEndTime = []
        for (var i = 0; i < userCalendarBookings.length; i++) {
            let start = new Date(parseInt(userCalendarBookings[i].startTime)).getHours();
            let end = new Date(parseInt(userCalendarBookings[i].endTime)).getHours();
            temp_userBookedTimesForStartTime.push(this.range(start, end - 1));
            temp_userBookedTimesForEndTime.push(this.range(start, end));
        }

        // Booking A: 9-12 & Booking B: 14-15 ==> userBookedTimes: [9,10,11,12,14,15]
        let userBookedTimesForStartTime = temp_userBookedTimesForStartTime.flat()
        let userBookedTimesForEndTime = temp_userBookedTimesForEndTime.flat()

        //Creation of chef worktime range, ex. worktime is 9 to 17 ==> startEnabledRange [9,10,11,...,16]
        var startEnabledRange = []
        var endEnabledRange = []

        for (var i = 0; i < workTimes.length; i++) {
            let start = new Date(parseInt(workTimes[i].startTime))
            let end = new Date(parseInt(workTimes[i].endTime))
            let startHour = start.getHours()
            let endHour = end.getHours()
            let temp_startEnabledRange = this.range(startHour, endHour - 1);
            let temp_endEnabledRange = this.range(startHour + 1, endHour);
            startEnabledRange = startEnabledRange.concat(temp_startEnabledRange);
            endEnabledRange = endEnabledRange.concat(temp_endEnabledRange);
        }
        startEnabledRange.sort(this.sortNumbers)
        endEnabledRange.sort(this.sortNumbers)

        //computing open slots where userBookings are considered
        let removedBookedStartEnabledRange = startEnabledRange.filter(value => !userBookedTimesForStartTime.includes(value))
        let removedBookedEndEnabledRange = endEnabledRange.filter(value => !userBookedTimesForEndTime.includes(value))

        //Set disabled hours for start & endtime considering chefCalendar worktimes & userCalendarBookings
        let defaultDisabledRange = [...Array(24).keys()];
        let disabledHoursStartTime = defaultDisabledRange.filter(value => !removedBookedStartEnabledRange.includes(value));
        let disabledHoursEndTime = defaultDisabledRange.filter(value => !removedBookedEndEnabledRange.includes(value));
        return disabledHoursStartTime
    }


    colorizeCalendar(worktimes) {
        console.log('worktimes')
        console.log(worktimes)
        let today = new Date();
        today.setDate(1);
        today.setMonth(this.state.month.getMonth());
        today.setFullYear(this.state.month.getFullYear());
        let tomorrow = new Date();
        tomorrow.setDate(1);
        tomorrow.setMonth(this.state.month.getMonth());
        tomorrow.setFullYear(this.state.month.getFullYear());

        //compute disabled days for a given month
        for (var i = 0; i <= this.daysInMonth(this.state.month.getMonth(), this.state.month.getFullYear()); i++) {
            tomorrow.setDate(today.getDate() + i);
            let disabledHours = this.onDemandComputeDisabledHours(tomorrow, worktimes);
            //console.log(tomorrow)
            if (disabledHours.length == 24) {
                modifiers.disabled.push(new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate()))
            } else {
                modifiers.enabled.push(new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate()))
            }
        }
    }

    onMonthChange(month) {
        this.setState({month: month});
        this.colorizeCalendar(this.state.chefWorkTimes);
        //window.location.reload()
    }

    range(start, end) {
        let array = [...Array(end + 1).keys()];
        return array.filter(element => element >= start);
    }

    sortNumbers(a, b) {
        return a - b;
    }

    //Computes the disabled hours based on the chef's worktime and existent bookings
    computeDisabledHours(selected) {
        let workTimes = this.state.chefWorkTimes.filter(workTime => new Date(parseInt(workTime.startTime)).toLocaleDateString() === selected.toLocaleDateString());
        let userCalendarBookings = this.state.userCalendarBookings.filter(userCalendarBooking => new Date(parseInt(userCalendarBooking.startTime)).toLocaleDateString() === selected.toLocaleDateString());
        //console.log("User bookings on the selected date:")
        //console.log(userCalendarBookings)
        //console.log("Chef worktime on the selected date:")

        //console.log('Chef work times:')
        //console.log(workTimes)
        if (workTimes.length == 0) {
            this.setState({defaultOpenValueStartTime: moment(new Date())})
            this.setState({defaultOpenValueEndTime: moment(new Date())})
            this.setState({startTime: null})
            this.setState({endTime: null})
            this.setState({disabledHoursStartTime: [...Array(24).keys()]});
            this.setState({disabledHoursEndTime: [...Array(24).keys()]});
            return;
        }

        var temp_userBookedTimesForStartTime = []
        var temp_userBookedTimesForEndTime = []
        for (var i = 0; i < userCalendarBookings.length; i++) {
            let start = new Date(parseInt(userCalendarBookings[i].startTime)).getHours();
            let end = new Date(parseInt(userCalendarBookings[i].endTime)).getHours();
            temp_userBookedTimesForStartTime.push(this.range(start, end - 1));
            temp_userBookedTimesForEndTime.push(this.range(start, end));
        }

        // Booking A: 9-12 & Booking B: 14-15 ==> userBookedTimes: [9,10,11,12,14,15]
        let userBookedTimesForStartTime = temp_userBookedTimesForStartTime.flat()
        let userBookedTimesForEndTime = temp_userBookedTimesForEndTime.flat()
        this.setState({userBookedTimesForStartTime: userBookedTimesForStartTime})
        this.setState({userBookedTimesForEndTime: userBookedTimesForEndTime})
        //console.log("Booked Slots by user for start time:")
        //console.log(userBookedTimesForStartTime)
        //console.log("Booked Slots by user for end time:")
        //console.log(userBookedTimesForEndTime)

        //Creation of chef worktime range, ex. worktime is 9 to 17 ==> startEnabledRange [9,10,11,...,16]
        var startEnabledRange = []
        var endEnabledRange = []

        for (var i = 0; i < workTimes.length; i++) {
            let start = new Date(parseInt(workTimes[i].startTime))
            let end = new Date(parseInt(workTimes[i].endTime))
            let startHour = start.getHours()
            let endHour = end.getHours()
            let temp_startEnabledRange = this.range(startHour, endHour - 1);
            let temp_endEnabledRange = this.range(startHour + 1, endHour);
            startEnabledRange = startEnabledRange.concat(temp_startEnabledRange);
            endEnabledRange = endEnabledRange.concat(temp_endEnabledRange);
        }
        startEnabledRange.sort(this.sortNumbers)
        endEnabledRange.sort(this.sortNumbers)
        //console.log("Times that can be booked as startTime without considering the existent user bookings:")
        //console.log(startEnabledRange)
        //console.log("Times that can be booked as endTime without considering the existent user bookings:")
        //console.log(endEnabledRange)

        //computing open slots where userBookings are considered
        let removedBookedStartEnabledRange = startEnabledRange.filter(value => !userBookedTimesForStartTime.includes(value))
        let removedBookedEndEnabledRange = endEnabledRange.filter(value => !userBookedTimesForEndTime.includes(value))
        //console.log("Times that can be booked as startTime considering the existent user bookings:")
        //console.log(removedBookedStartEnabledRange)
        //console.log("Times that can be booked as endTime considering the existent user bookings:")
        //console.log(removedBookedEndEnabledRange)

        //TimePicker starts at the next possible open slot
        if (removedBookedStartEnabledRange.length != 0) {
            var startMoment = moment({hour: removedBookedStartEnabledRange[0], minute: 0})
            var endMoment = moment({hour: removedBookedStartEnabledRange[0], minute: 0})
            this.setState({defaultOpenValueStartTime: startMoment})
            this.setState({defaultOpenValueEndTime: endMoment})
        }

        //Set disabled hours for start & endtime considering chefCalendar worktimes & userCalendarBookings
        let defaultDisabledRange = [...Array(24).keys()];
        this.setState({disabledHoursStartTime: defaultDisabledRange.filter(value => !removedBookedStartEnabledRange.includes(value))});
        this.setState({disabledHoursEndTime: defaultDisabledRange.filter(value => !removedBookedEndEnabledRange.includes(value))});
    }

    render() {
        //console.log(this.state.userCalendarBookings)
        return (
            <div className="md-grid" id="calendarBox" label="UserCalendar"
                 style={{width: '60%', background: 'white'}}>

                <div>
                    <DayPicker
                        selectedDays={this.state.selectedDay}
                        onDayClick={this.handleDayClick}
                        modifiers={modifiers}
                        modifiersStyles={modifiersStyles}
                        onMonthChange={this.onMonthChange}
                    />
                    {this.state.selectedDay ?
                        (<h3 style={{textAlign: 'center'}}>{this.state.selectedDay.toLocaleDateString()}</h3>) :
                        (<h3 style={{textAlign: 'center'}}>Choose a day above</h3>)}
                </div>

                <div style={{marginLeft: '20%'}}>
                    <h4>from</h4>
                    <TimePicker
                        size="large"
                        format='HH:mm'
                        value={this.state.startTime}
                        defaultOpenValue={this.state.defaultOpenValueStartTime}
                        onChange={this.onChangeStartTime}
                        hideDisabledOptions={false}
                        disabledHours={this.disabledHoursStartTime}
                        disabledMinutes={this.disabledMinutes}
                        minuteStep={60}
                        hourStep={1}
                        placeholder='Pick a time'/>
                </div>


                <div style={{marginLeft: '20%'}}>
                    <h4 style={{marginTop: '10%'}}>to</h4>
                    <TimePicker
                        size="large"
                        format='HH:mm'
                        value={this.state.endTime}
                        defaultOpenValue={this.state.defaultOpenValueEndTime}
                        onChange={this.onChangeEndTime}
                        hideDisabledOptions={false}
                        disabledHours={this.disabledHoursEndTime}
                        disabledMinutes={this.disabledMinutes}
                        minuteStep={60}
                        hourStep={1}
                        placeholder='Pick a time'/>

                    <PaymentDialog price={this.props.chef.price} handleSubmit={this.handleSubmit}
                                   onSubmit={this.handleSubmit}>
                    </PaymentDialog>
                </div>
            </div>
        )
    }
}

export default withRouter(UserCalendar);

