import React from "react";
import {withRouter} from "react-router-dom";
import {Button, CardTitle, SelectionControlGroup, TextField} from "react-md";
import HttpService from '../../Services/HttpService'
import UserService from '../../Services/UserService'

const CITY_LIST =[{
    label: 'Munich',
    value: 'Munich',
},{
    label: 'Garching',
    value: 'Garching',
},{
    label: 'Eching',
    value: 'Eching',
},{
    label: 'Rosenheim',
    value: 'Rosenheim',
}
];
class EditProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: UserService.getCurrentUser().email,
            firstName: '',
            lastName: '',
            phoneNumber: '',
            city: 'Munich',
            languages: [],
            userType: UserService.getCurrentUser().userType,
            language1: '',
            language2: '',
        };
    }

    isChef = () => {
        if (this.state.userType === 'Chef') return true;
        return false;
    }

    handleChange = (key, val) => {
        this.setState({
            [key]: val
        })
    }

    render() {
        return (
            <div className="md-grid" id="ProfileTable" label="" style={{
                display: 'flex',
                width: '30%',
                margin: '0 auto',
                marginTop: '10%',
                background: 'white',
            }}>
                <form className="md-grid" onSubmit={this.handleSubmit}>
                    <CardTitle title="Profile" id='ProfileTitle'
                               subtitle="Please Upload your Profile before use"
                               style={{
                                   marginLeft: 'auto',
                                   marginRight: 'auto'
                               }}/>
                    <TextField
                        id="floating-center-firstName"
                        label="firstname"
                        required
                        lineDirection="center"
                        placeholder="Please input your firstname"
                        onChange={value => this.handleChange('firstName', value)}
                    />
                    < TextField
                        id="floating-center-lastName"
                        label="lastName"
                        required
                        lineDirection="center"
                        placeholder="Please input your lastname"
                        onChange={value => this.handleChange('lastName', value)}
                    />
                    <TextField
                        id="floating-center-phoneNumber"
                        label="phonenumber"
                        required
                        lineDirection="center"
                        placeholder="Please input your common phonenumber"
                        onChange={value => this.handleChange('phoneNumber', value)}
                    />
                    {this.isChef() ?
                        <div>
                            <TextField
                                id="floating-center-foodType"
                                label="cuisine"
                                required
                                lineDirection="center"
                                placeholder="Please input your best cuisine type"
                                onChange={value => this.handleChange('foodType', value)}
                            />
                            <SelectionControlGroup
                                id="selection-city-radios"
                                name="city"
                                type="radio"
                                label="Please choose your city"
                                defaultValue='Munich'
                                onChange={value => this.handleChange('city', value)}
                                controls={[{
                                    label: 'Munich',
                                    value: 'Munich',
                                }, {
                                    label: 'Garching',
                                    value: 'Garching',
                                }, {
                                    label: 'Eching',
                                    value: 'Eching',
                                }]}
                            />
                            < TextField
                                id="floating-center-language1"
                                label="Mother Language"
                                required
                                lineDirection="center"
                                placeholder="Please input your mother language"
                                onChange={value => this.handleChange('language1', value)}
                            />
                            <TextField
                                id="floating-center-language2"
                                label="Second Language"
                                required
                                lineDirection="center"
                                placeholder="Please input your best foreign language"
                                onChange={value => this.handleChange('language2', value)}
                            />
                            <TextField
                                id="floating-center-introduction"
                                label="Short Bio"
                                required
                                lineDirection="center"
                                placeholder="Short introduction for your self"
                                onChange={value => this.handleChange('introduction', value)}
                            />
                        </div> :
                        <div></div>}
                    <Button id="submit" type="submit"
                            flat primary swapTheming
                            style={{
                                marginTop: '10%',
                                marginLeft: 'auto',
                                marginRight: 'auto'
                            }}>Upload</Button>
                </form>
            </div>)
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.state.languages = [this.state.language1, this.state.language2]
        let user = UserService.getCurrentUser().userType === 'Customer' ? {
            email: this.state.email,
            userType: this.state.userType,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phoneNumber: this.state.phoneNumber,
        } : UserService.getCurrentUser().userType === 'Chef' ? {
            email: this.state.email,
            userType: this.state.userType,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phoneNumber: this.state.phoneNumber,
            city: this.state.city,
            foodType: this.state.foodType,
            introduction: this.state.introduction,
            languages: this.state.languages,
        } : {}
        console.log(user)
        this.props.onSubmit(user);
    }
}
export default withRouter(EditProfile)