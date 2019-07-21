import React, {Component} from 'react';
import {Button, Media} from 'react-md';
import {withRouter} from 'react-router-dom'
import StarRatingComponent from 'react-star-rating-component';
import ChefService from "../../Services/ChefService";
import ReviewChefService from '../../Services/ReviewChefService';

class SearchResultCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chef: [],
            reviews: []
        }
    }

    componentWillMount(){
        ChefService.getChefDetail(this.props.id).then((data) => {
            this.setState({chef: data});
        }).catch((e) => {
            console.error(e);
        });
        ReviewChefService.getReviews().then((reviews) => {
            this.setState({
                reviews: [...reviews].filter(review => review.chefName === this.state.chef.firstName + ' ' + this.state.chef.lastName)
            });
        }).catch((e) => {
            console.error(e);
        });
    }

    calculateOverallRating(){
        let result = this.state.reviews.reduce((acc, val) => {
            return val.chefName == this.state.chef.firstName + ' ' + this.state.chef.lastName ? acc + val.overallRating : acc;
          }, 0);
        return Math.round(result/ this.state.reviews.length);
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
                    }}>{this.props.firstName} {this.props.lastName}</h1>
                    <h3>
                    <StarRatingComponent
                        name="rate2"
                        editing={false}
                        starCount={5}
                        value={this.calculateOverallRating()}
                    />
                    </h3>
                    <h3 style = {{marginTop:'-5%', marginLeft: '1.1%'}}>{this.state.reviews.length} review(s)</h3>
                    <div style={{
                        marginTop: '10px',
                        color: 'black',
                        marginLeft: '1.1%'
                    }}
                    >{this.props.city}</div>
                    <h2 style={{
                        fontWeight: 'bolder',
                        fontFamily: 'Lucida Bright',
                        width: '70%',
                        marginTop: '40px',
                        marginLeft: '1.1%'
                    }}>{this.props.foodtype}</h2>
                    <div style={{
                        marginLeft: '1.1%'}}>{this.props.introduction.slice(0, 200) + '...'}
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
