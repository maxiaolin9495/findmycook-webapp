import React, { Component } from 'react';
import Navigation from '../../UIcomponents/PageDesign/Navigation';
import ChefCalendar from '../../UIcomponents/Calendar/ChefCalendar';
import Background from "../../Images/Homepage.jpg";
import ChefCalendarService from '../../Services/ChefCalendarService';
import ChefWorkTimeDetail from '../../UIcomponents/Calendar/ChefWorkTimeDetail';
import UserService from "../../Services/UserService";


export class ChefCalendarView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            workTimes: []
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

    getStyleForNoEntry = () => {
        return {
            display: 'flex',
            width: '60%',
            padding: '10px',
            marginLeft: '20%',
            marginBottom: '0%',
            opacity: '0.8',
            color: 'white',
            background: 'black'}
    }

    //TODO: Fetch actual chefName to use properly in line 21
    componentWillMount(){
        let currentUser = UserService.getCurrentUser();
        let chefName = currentUser.firstName + ' ' + currentUser.lastName;
        ChefCalendarService.getWorkTimeEntries().then((workTimes) => {
            this.setState({workTimes: [...workTimes].filter(workTime => workTime.chefName === chefName)});
            this.setState({workTimes: workTimes.sort(function(a, b) {
                return a.startTime - b.startTime;})});
        }).catch((e) => {
            console.error(e);
        });  
        console.log(this.state.workTimes)    
    }

    saveWorkTimeEntry(workTime) {  
        alert('Worktime entry saved');
        ChefCalendarService.saveWorkTimeEntry(workTime).then((data) => {
            window.location.reload();
        }).catch((e) => {
            console.error(e);
            this.setState(Object.assign({}, this.state, {error: 'Error while creating booking'}));
        });
    }

    deleteWorktime(id) {
        ChefCalendarService.deleteWorktime(id).then((message) => {
            window.location.reload();
        }).catch((e) => {
            console.log(e);
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
                    {this.state.workTimes.length == 0 ? 
                    (<h4 style = {this.getStyleForNoEntry()}>No entries</h4>) : <h4></h4>}
                    {this.state.workTimes.map((workTime) => (  <ChefWorkTimeDetail workTime={workTime} deleteWorktime={(id) => this.deleteWorktime(id)}/>  ))}
                </div>

            </div>
        )
    }
}