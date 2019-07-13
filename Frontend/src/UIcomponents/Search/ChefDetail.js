"use strict";

import React from 'react';
import {Card, CardTitle, TextField, CardText, Media, MediaOverlay, Grid, Cell, Button, FontIcon} from 'react-md';
import {withRouter} from 'react-router-dom'
import DatePicker from 'react-datepicker';
import StarRatingComponent from 'react-star-rating-component';
import moment from 'moment';

const style = {maxWidth: 500};

class ChefDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            quantity: 1,
            date: moment()
        }
    }

    handleChange(date) {
        this.setState({
            date: date.hours(0).minutes(0).seconds(0).milliseconds(0)
        });
    }

    render() {
        return !this.props.loading ? (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr'
                }}>
                    <div style={{
                        padding: '0 100px',
                    }}>
                        <div style={{}}>
                            <Media style={{borderRadius: '15px', boxShadow: '4px 4px 10px gray'}} aspectRatio="1-1">
                                <img src={this.props.chef.photo} alt="Something from unsplash.it"/>
                            </Media></div>
                    </div>
                    <div>
                        <div style={{marginTop: '7%'}}>
                            <h1 style={{
                                fontSize: '50px',
                                fontWeight: 'bolder',
                                fontFamily: 'San Francisco'
                            }}>{this.props.chef.name}</h1>
                            <h2 style={{
                                marginTop: '20px'
                            }}>{this.props.chef.foodtype}</h2>
                            <StarRatingComponent
                                name="rate2"
                                editing={false}
                                starCount={5}
                                value={this.props.chef.rating}
                            />
                            <div style={{
                                fontSize: '35px',
                                fontFamily: 'San Francisco'
                            }}>¥{this.props.chef.price} now
                            </div>
                            <p style={{
                                width: '80%',
                                marginTop: '30px',
                                fontFamily: 'San Francisco'
                            }}>{this.props.chef.introduction}</p>
                        </div>
                        <div style={{
                            width: '80%',
                            display: 'flex',
                            flexDirection: 'row',
                            marginTop: '50px',
                            justifyContent: 'space-between',
                        }}>
                            <div>
                                <h2>Date:</h2>
                                <div style={{
                                    width: '300px',
                                    marginTop: '25px'
                                }}><DatePicker
                                    selected={this.state.date}
                                    onChange={this.handleChange}
                                ></DatePicker>
                                </div>
                            </div>
                        </div>
                        <div style={{
                            width: '68%',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                        </div>

                    </div>
                </div>
        ) : <div></div>;
    }
}

export default withRouter(ChefDetail);
