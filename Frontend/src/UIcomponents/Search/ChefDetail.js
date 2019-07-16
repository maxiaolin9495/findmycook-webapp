"use strict";

import React from 'react';
import {Card, CardTitle, TextField, CardText, Media, MediaOverlay, Grid, Cell, Button, FontIcon} from 'react-md';
import {withRouter} from 'react-router-dom'
import StarRatingComponent from 'react-star-rating-component';
import moment from 'moment';
import { PayPalButton } from "react-paypal-button";

const style = {maxWidth: 500};

class ChefDetail extends React.Component {

  constructor(props) {
      super(props);
  }


    render() {
      var cashValue = String(this.props.chef.price)
      console.log(this.props.chef.price);
      return (
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
                            }}>{this.props.chef.firstName}</h1>
                            <h2 style={{
                                marginTop: '20px'
                            }}>{this.props.chef.foodType}</h2>
                            <StarRatingComponent
                                name="rate2"
                                editing={false}
                                starCount={5}
                                value={this.props.chef.rating}
                            />
                            <div style={{
                                fontSize: '35px',
                                fontFamily: 'San Francisco'
                            }}>€{this.props.chef.price}
                            </div>
                        </div>
                        <div style={{
                            width: '80%',
                            display: 'flex',
                            flexDirection: 'row',
                            marginTop: '50px',
                            justifyContent: 'space-between',
                        }}>
                        </div>
                        <div style={{
                            width: '68%',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                        <div>
                        <PayPalButton
                        amount= {cashValue}
                        onSuccess={(details, data) => {
                          alert("Transaction completed by " + details.payer.name.given_name);
                          // OPTIONAL: Call your server to save the transaction
                          return fetch("/paypal-transaction-complete", {
                            method: "post",
                            body: JSON.stringify({
                              orderID: data.orderID
                            })
                          });
                        }}
                        options={{
                          clientId: "ATU8nlBxIDUt7zr508CjRDWmHkM3kUqjDyMJufdwFhS-4ob5qrEMYtIsz43fcz27Eatcj96DG_w71XB7",
                          currency: "EUR"
                        }}
                        />

                            </div>
                        </div>
                    </div>
                    <div style={{
                        marginLeft: '18%',
                        width: '68%',
                        display: 'flex',
                        marginTop: '80px',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    }}>
                    <h4 style={{
                        fontSize: '30px',
                        fontWeight: 'bolder',
                        fontFamily: 'San Francisco'
                    }}>Short Bio</h4>
                    <h4 style={{
                        fontSize: '20px',
                        fontFamily: 'San Francisco'
                    }}>{this.props.chef.introduction}</h4>
                    </div>

                </div>
      );
    }
}

export default withRouter(ChefDetail);
