import React, {Component} from 'react';
import {Button, Media} from 'react-md';
import {withRouter} from 'react-router-dom'
import StarRatingComponent from 'react-star-rating-component';

class SearchResultCard extends Component {
    constructor(props) {
        super(props);

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
                    <Media>
                        <img src={this.props.photo} alt="presentation" style={{
                            objectFit: 'cover'
                        }}/>
                    </Media>
                </div>
                <div style={{
                    width: '40%',
                }}>
                    <h1 style={{
                        fontWeight: 'bolder',
                        fontFamily: 'Lucida Bright'
                    }}>{this.props.name}</h1>
                    <StarRatingComponent
                        name="rate2"
                        editing={false}
                        starCount={5}
                        value={this.props.rating}
                    />
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
                    }}>{this.props.foodtype}</h2>
                    <div>{this.props.introduction.slice(0, 200) + '...'}
                    </div>
                </div>
                <div style={{width: '13%'}}>
                    <div style={{
                        color: 'green',
                        marginTop: '120px',
                        marginRight: '50px',
                        fontSize: '40px',
                    }}>€{this.props.price}</div>
                    <Button primary style={{
                        background: 'gray',
                        borderRadius: '10px',
                        color: 'white',
                        marginTop: '15px',
                        paddingLeft: '20px',
                        paddingRight: '20px',
                        paddingTop: '10px',
                        paddingBottom: '10px',
                        marginRight: '50px',
                        fontSize: '22px',
                        fontFamily: 'San Francisco'
                    }} onClick={() => this.props.history.push(`/chef/${this.props.id}`)}>Select</Button>
                </div>
            </div>
        );
    }
}

export default withRouter(SearchResultCard);
