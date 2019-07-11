import {Component} from "react";
import {Button} from "react-md/es";
import {withRouter} from "react-router-dom";
import React from "react";
import BookingService from "../../Services/BookingService";
import UserService from "../../Services/UserService";

class BookingCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            name: '',
            date: '',
        }
    }

    componentWillMount(){
        this.setState({
            loading: true
        });
        if(this.props.userType === 'Chef') {
            BookingService.getCustomerName(this.props.customerEmail).then((data) => {
                this.setState({
                    name: data.firstName + ' ' + data.lastName,
                    loading: false
                });
            }).catch((e) => {
                console.error(e);
            });
        }else{
            BookingService.getChefName(this.props.chefEmail).then((data) => {
                this.setState({
                    name: data.firstName + ' ' + data.lastName,
                    loading: false
                });
            }).catch((e) => {
                console.error(e);
            });
        }
        this.setState({date: this.getDate()});
    }

    getDate = () =>{
        let date = new Date(parseInt(this.props.time));
        return date.toDateString() + ' ' + date.toTimeString().split('GMT')[0];
    }

    render() {
        return (
            <div style={{
                marginTop: '10px',
                marginLeft: '5%',
                width: '70%',
                display: 'flex',
                paddingTop: '1%',
                paddingBottom: '1%',
                paddingLeft: '1%',
                background: 'white',
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>
                <div style={{
                    width: '50%',
                    flex: '0.8'
                }}>
                </div>
                <div style={{
                    width: '40%',
                }}>
                    <h1 style={{
                        fontWeight: 'bolder',
                        fontFamily: 'Lucida Bright'
                    }}>{this.state.name}</h1>
                    <div style={{
                        marginTop: '10px',
                        color: 'grey'
                    }}
                    >{this.props.city}</div>
                    <h2 style={{
                        fontWeight: 'bolder',
                        fontFamily: 'Lucida Bright',
                        width: '70%',
                        marginTop: '40px'
                    }}>{this.getDate()}</h2>
                </div>
                <div style={{
                    marginTop: '120px',
                    marginRight: '50px',
                    fontSize: '30px',
                }}>{this.props.status}</div>
                <div style={{width: '13%'}}>
                    <div style={{
                        color: 'green',
                        marginTop: '120px',
                        marginRight: '50px',
                        fontSize: '40px',
                    }}>€{this.props.price}</div>
                </div>
            </div>
        );
    }
}

export default withRouter(BookingCard);