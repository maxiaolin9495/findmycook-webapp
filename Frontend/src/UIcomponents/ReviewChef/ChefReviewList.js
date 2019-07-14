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

    componentWillMount(){
        this.setState({
            loading: true
        });
        ReviewChefService.getReviews().then((reviews) => {
            this.setState({
                reviews: [...reviews],
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

    deleteReview(id) {
        ReviewChefService.deleteReview(id).then((message) => {
            this.props.history.push('/');
        }).catch((e) => {
            console.log(e);
        });
    }

    //TODO: Adjust the input to be dependent on the chef being clicked
    calculateOverallRating(){
        let result = this.state.reviews.reduce((acc, val) => {
            return val.chefName == "Michael Scott" ? acc + val.overallRating : acc;
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
                /> 

            <div>
                <h3 style = {this.getStyleForReviewTitle()}>Reviews</h3>
            </div>

            {this.state.reviews.map((review) => (
            <ChefReviewDetails 
                    review={review} 
                    deleteReview={this.deleteReview}
                />
            ))}

            </div>

        )
        
    }
}

export default withRouter(ChefReviewList);