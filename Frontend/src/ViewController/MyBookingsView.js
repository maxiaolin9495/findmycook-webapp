import React from "react";
import Navigation from "../UIcomponents/PageDesign/Navigation";
import Background from "../Images/Homepage.jpg";
import MyBookings from "../UIcomponents/Booking/MyBookings";
import BookingService from "../Services/BookingService";
import UserService from "../Services/UserService";

export class MyBookingsView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: [],
            email: UserService.getCurrentUser().email,
            userType:  UserService.getCurrentUser().userType,
        };
    }

    componentWillMount(){
        this.setState({
            loading: true
        });

        BookingService.getBookings(UserService.getCurrentUser().userType, UserService.getCurrentUser().email).then((data) => {
            this.setState({
                data: [...data],
                loading: false
            });
        }).catch((e) => {
            console.error(e);
        });

    }

    render(){
        return (<div>
            <Navigation/>
            <section>
                <img src={Background} className="bg"/>
                <MyBookings data={this.state.data} />
            </section>
        </div>);
    }
}