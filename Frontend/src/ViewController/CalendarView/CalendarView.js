import React, { Component } from 'react';
import Navigation from '../../UIcomponents/PageDesign/Navigation';
import Calendar from '../../UIcomponents/ChefCalendar/Calendar';
import Background from "../../Images/Homepage.jpg";
import CalendarService from '../../Services/CalendarService';


export class CalendarView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bookings: []
        };
    }

    componentWillMount(){
        CalendarService.getBookings().then((bookings) => {
            this.setState({bookings: [...bookings]});
        }).catch((e) => {
            console.error(e);
        });
    }

    deleteBooking = (id) => {
        this.setState({ bookings: [...this.state.bookings.filter(booking => booking.id !== id)] });
        alert('Deleting booking works -by CalendarView');
    }

    createBooking(booking) {
        /*
        CalendarService.createBooking(booking).then((data) => {
            this.props.history.push('/');
        }).catch((e) => {
            console.error(e);
            this.setState(Object.assign({}, this.state, {error: 'Error while creating booking'}));
        });*/
        alert('Create booking works -by CalendarView');
    }


    render() {
        return (    
            <div>
                <Navigation/>
                <Calendar onSubmit={(booking) => this.createBooking(booking)} deleteBooking={ (booking) => this.deleteBooking(booking.id)} />
                <section>
                    <img src={Background} className="bg"/>
                </section>
            </div>
        )
    }
}