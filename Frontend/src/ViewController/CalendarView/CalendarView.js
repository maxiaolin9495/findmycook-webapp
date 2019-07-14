import React, { Component } from 'react';
import Navigation from '../../UIcomponents/PageDesign/Navigation';
import Calendar from '../../UIcomponents/ChefCalendar/Calendar';
import Background from "../../Images/Homepage.jpg";
import CalendarService from '../../Services/CalendarService';


export class CalendarView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            calendarBookings: []
        };
    }

    componentWillMount(){
        CalendarService.getBookings().then((calendarBookings) => {
            this.setState({calendarBookings: [...calendarBookings]});
        }).catch((e) => {
            console.error(e);
        });
    }

    createBooking(calendarBooking) {
        alert('Booking request saved');
        CalendarService.createBooking(calendarBooking).then((data) => {
            this.props.history.push('/');
        }).catch((e) => {
            console.error(e);
            this.setState(Object.assign({}, this.state, {error: 'Error while creating booking'}));
        });
        
    }


    render() {
        return (    
            <div>
                <Navigation/>
                <Calendar onSubmit={(calendarBooking) => this.createBooking(calendarBooking)} />
                <section>
                    <img src={Background} className="bg"/>
                </section>
            </div>
        )
    }
}