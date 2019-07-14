import React, {Component} from 'react';
import BookingCard from "./BookingCard";
import UserService from "../../Services/UserService";
import {withRouter} from "react-router-dom";


const bookingCard = (key, userType, chefEmail, customerEmail, time, address, city, price, status) => <BookingCard
    key={key}
    id={key}
    userType={userType}
    chefEmail={chefEmail}
    customerEmail={customerEmail}
    time={time}
    address={address}
    city={city}
    price={price}
    status={status}
/>;

class MyBookings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookingCards: [],
        }
    }

    componentWillReceiveProps(props) {
        const bookingCards = props.data.map(data =>
            bookingCard(data._id, UserService.getCurrentUser().userType ,data.chefEmail, data.customerEmail, data.startTime, data.endTime, data.address, data.city, data.price, data.status));
        this.setState({bookingCards});
    }

    render(){
        return (
            <div style={{
                display: 'relative',
                width: '70%',
                margin: '0 auto',
                marginTop: '10%',
                minWidth: '200px'
            }}>
            {this.state.bookingCards}
        </div>);
    }
}
export default withRouter(MyBookings);