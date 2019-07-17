import React from "react";
import {withRouter} from "react-router-dom";
import {Button, CardTitle, SelectionControlGroup, TextField, FileInput} from "react-md";
import UserService from '../../Services/UserService'
import Resizer from 'react-image-file-resizer';

class EditProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: UserService.getCurrentUser().email,
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address:'',
            price:'',
            fileName: '',
            photo:'',
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

    fileChangedHandler(event) {
        console.log(event.width);
        let fileInput = false;
        if(event) {
            fileInput = true
        }


        if(fileInput) {


            Resizer.imageFileResizer(
                event,
                200,
                300,
                'JPEG',
                100,
                0,
                uri => {
                    this.setState({'photo': uri,
                    fileName: event.name})
                    console.log(uri);
                },
                'base64'
            );
        }
    }

    render() {
        return (
            <div className="md-grid" id="ProfileTable" label="" style={{
                display: 'flex',
                width: '30%',
                margin: '0 auto',
                marginTop: '10%',
                background: 'white',
                minWidth: '200px'
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
                    {!this.isChef()?<SelectionControlGroup
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
                        />:''}
                    {!this.isChef()?
                        <TextField
                            id="floating-center-lastName"
                            label="address"
                            required
                            lineDirection="center"
                            placeholder="Please input your address"
                            onChange={value => this.handleChange('address', value)}/>:''}
                    <TextField
                        id="floating-center-phoneNumber"
                        label="phonenumber"
                        required
                        lineDirection="center"
                        placeholder="Please input your common phonenumber"
                        onChange={value => this.handleChange('phoneNumber', value)}
                    />
                    {this.isChef() ?
                        <div style={{
                            width: '100%'
                        }}>
                            <div id = "loading"/>
                            <TextField
                                style={{
                                    marginTop: '10px'
                                }}
                                id="server-upload-file-field"
                                placeholder="No Selfie chosen"
                                value={this.state.fileName}
                                className="file-inputs__upload-form__file-field"
                                readOnly
                            />
                            <hr style={{color: 'none',border:0}}/>
                            <FileInput type="file" id = 'photo' accept="image/*" onChange={values => this.fileChangedHandler(values)} primary/>
                            <TextField
                                id="floating-center-foodType"
                                label="cuisine"
                                required
                                lineDirection="center"
                                placeholder="Please input your best cuisine type"
                                onChange={value => this.handleChange('foodType', value)}
                            />
                            <TextField
                                id="floating-center-price"
                                label="price"
                                required
                                lineDirection="center"
                                placeholder="Please input your service fee"
                                onChange={value => this.handleChange('price', value)}
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
                                marginRight: 'auto',
                                position: 'relative',
                            }}>Upload</Button>
                </form>
            </div>)
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.state.languages = [this.state.language1, this.state.language2];
        let user = UserService.getCurrentUser().userType === 'Customer' ? {
            email: this.state.email,
            userType: this.state.userType,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            phoneNumber: this.state.phoneNumber,
            city: this.state.city,
        } : UserService.getCurrentUser().userType === 'Chef' ? {
            email: this.state.email,
            userType: this.state.userType,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phoneNumber: this.state.phoneNumber,
            price: this.state.price,
            city: this.state.city,
            foodType: this.state.foodType,
            introduction: this.state.introduction,
            photo: this.state.photo,
            languages: this.state.languages,
        } : {}
        console.log(user)
        this.props.onSubmit(user);
    }
}
export default withRouter(EditProfile)