import React, { Component } from 'react';
import Navigation from '../../UIcomponents/PageDesign/Navigation';
import UserCalendar from '../../UIcomponents/Calendar/UserCalendar';
import Background from "../../Images/Homepage.jpg";
import UserCalendarService from '../../Services/UserCalendarService';


export class CalendarView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userCalendarBookings: []
        };
    }

    //TODO: Fetch actual chefName to use properly in line 21
    componentWillMount(){
        UserCalendarService.getBookings().then((userCalendarBookings) => {
            this.setState({userCalendarBookings: [...userCalendarBookings].filter(userCalendarBooking => userCalendarBooking.chefName === 'Michael Scott')});
        }).catch((e) => {
            console.error(e);
        });
    }

    createBooking(userCalendarBooking) {
        alert('Booking request saved');
        UserCalendarService.createBooking(userCalendarBooking).then((data) => {
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
                <UserCalendar userCalendarBookings = {this.state.userCalendarBookings} onSubmit={(userCalendarBooking) => this.createBooking(userCalendarBooking)} />
                <section>
                    <img src={Background} className="bg"/>
                </section>
            </div>
        )
    }
}