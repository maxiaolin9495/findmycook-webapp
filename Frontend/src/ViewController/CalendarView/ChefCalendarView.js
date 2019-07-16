import React, { Component } from 'react';
import Navigation from '../../UIcomponents/PageDesign/Navigation';
import ChefCalendar from '../../UIcomponents/Calendar/ChefCalendar';
import Background from "../../Images/Homepage.jpg";
import ChefCalendarService from '../../Services/ChefCalendarService';
import ChefWorkTimeDetail from '../../UIcomponents/Calendar/ChefWorkTimeDetail';


export class ChefCalendarView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            workTimes: [],
            refreshFlag: true
        };
    }

    getStyleForWorkTimeTitle = () => {
        return {
            display: 'flex',
            width: '60%',
            padding: '10px',
            marginTop: '2%',
            marginLeft: '20%',
            marginBottom: '0%',
            color: 'white',
            background: 'rgb(75,140,209,1)'}
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
            this.props.history.push('/chefCalendar');
        }).catch((e) => {
            console.error(e);
            this.setState(Object.assign({}, this.state, {error: 'Error while creating booking'}));
        });
        
    }
    

    render() {
        return (    
            <div>
                <Navigation/>
                <ChefCalendar workTimes = {this.state.workTimes} onSubmit={(workTime) => this.saveWorkTimeEntry(workTime)} />
                <section>
                    <img src={Background} className="bg"/>
                </section>

                <div>
                    <h3 style = {this.getStyleForWorkTimeTitle()}>Worktime Entries</h3>
                    {this.state.workTimes.map((workTime) => (  <ChefWorkTimeDetail workTime={workTime} />  ))}
                </div>

            </div>
        )
    }
}