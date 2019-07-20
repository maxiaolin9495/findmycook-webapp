import React from 'react';
import {withRouter} from 'react-router-dom'
import ChefReviewDetails from './ChefReviewDetails';
import ChefReviewForm from '../../UIcomponents/ReviewChef/ChefReviewForm';
import ReviewChefService from '../../Services/ReviewChefService';

class ChefReviewList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            reviews: []
        };
        
    }

    //TODO: Adjust the input to be dependent on the chef Name in line 24
    componentWillMount(){
        this.setState({
            loading: true
        });
        ReviewChefService.getReviews().then((reviews) => {
            this.setState({
                reviews: [...reviews].filter(review => review.chefName === this.props.chef.firstName + ' ' + this.props.chef.lastName),
                loading: false
            });
        }).catch((e) => {
            console.error(e);
        });
        
    }

    getStyleForReviewTitle = () => {
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

    getStyleForLoading = () => {
        return {
            display: 'flex',
            width: '60%',
            padding: '10px',
            marginTop: '0%',
            marginLeft: '20%',
            marginBottom: '0%',
            background: 'rgb(255,255,255,0.8)'
        }
    }

    getStyleForNoReviews = () => {
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

    
    calculateOverallRating(){
        let result = this.state.reviews.reduce((acc, val) => {
            return val.chefName == this.props.chef.firstName + ' ' + this.props.chef.lastName ? acc + val.overallRating : acc;
          }, 0);

        return Math.round(result/ this.state.reviews.length);
    }

    render() {
        if (this.state.loading) {
            return <h2 style = {this.getStyleForLoading()}>Loading...</h2> 
        }

        return (
            <div>
            <ChefReviewForm 
                onSubmit={(review) => this.props.onSubmit(review)}
                reviewsAmount={this.state.reviews.length} 
                averageOverallRating = {this.calculateOverallRating()}
                chef={this.props.chef}
                /> 

            <div>
                <h3 style = {this.getStyleForReviewTitle()}>Reviews</h3>
                {this.state.reviews.length == 0 ? 
                    (<h4 style = {this.getStyleForNoReviews()}>No entries</h4>) : <h4></h4>}
            
            </div>

            {this.state.reviews.map((review) => (
            <ChefReviewDetails 
                    review={review}
                />
            ))}

            </div>

        )
        
    }
}

export default withRouter(ChefReviewList);