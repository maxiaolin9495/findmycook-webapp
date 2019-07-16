import React, { Component } from 'react';
import Navigation from '../../UIcomponents/PageDesign/Navigation';
import ChefCalendar from '../../UIcomponents/Calendar/ChefCalendar';
import Background from "../../Images/Homepage.jpg";
import ChefCalendarService from '../../Services/ChefCalendarService';


export class ChefCalendarView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            workTimes: []
        };
    }

    //TODO: Fetch actual chefName to use properly in line 21
    componentWillMount(){
        ChefCalendarService.getWorkTimeEntries().then((workTimes) => {
            this.setState({workTimes: [...workTimes].filter(workTime => workTime.chefName === 'Michael Scott')});
        }).catch((e) => {
            console.error(e);
        });
    }

    saveWorkTimeEntry(workTime) {
        alert('Booking request saved');
        ChefCalendarService.saveWorkTimeEntry(workTime).then((data) => {
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
                <h1>Plan your workdays</h1>
                <ChefCalendar workTimes = {this.state.workTimes} onSubmit={(workTime) => this.saveWorkTimeEntry(workTime)} />
                <section>
                    <img src={Background} className="bg"/>
                </section>
            </div>
        )
    }
}