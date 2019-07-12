import React, { Component } from 'react';
import Navigation from '../../UIcomponents/PageDesign/Navigation';
import Calendar from '../../UIcomponents/ChefCalendar/Calendar';
import Background from "../../Images/Homepage.jpg";



export class CalendarView extends Component {

    render() {
        return (    
            <div>
                <Navigation/>
                <Calendar/>
                <section>
                    <img src={Background} className="bg"/>
                </section>
            </div>
        )
    }
}