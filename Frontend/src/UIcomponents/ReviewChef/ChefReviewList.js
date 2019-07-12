import React from 'react';
import {withRouter} from 'react-router-dom'
import ChefReviewDetails from './ChefReviewDetails';
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

    deleteReview = (id) => {
        this.setState({ reviews: [...this.state.reviews.filter(review => review.id !== id)] });
    }

    render() {
        if (this.state.loading) {
            return <h2 style = {{
                                display: 'flex',
                                width: '60%',
                                padding: '10px',
                                marginTop: '0%',
                                marginLeft: '20%',
                                marginBottom: '0%',
                                background: 'rgb(255,255,255,0.8)'}}>Loading...</h2> 
        }

        return this.state.reviews.map((review) => (
        <ChefReviewDetails key={review.id} review={review} deleteReview={this.deleteReview}/>
        ));
        
    }
}

export default withRouter(ChefReviewList);


/* Example
this.state = {
    reviews: [
        {
            qualityRating: 1,
            punctualityRating: 2,
            creativityRating: 3,
            socialSkillsRating: 4,
            overallRating: 2,
                    id: 1,
                    reviewerName: "Michel",
                    chefName: "Michael Scott",
                    timeStamp: Date.now(),
                    title: "Suberb Chef!",
                    text: "Very Good, came on time and was very friendly",
            
        },{
            qualityRating: 2,
            punctualityRating: 3,
            creativityRating: 2,
            socialSkillsRating: 3,
            overallRating: 3,
                    id: 2,
                    reviewerName: "Ola",
                    chefName: "Michael Scott",
                    timeStamp: Date.now(),
                    title: "Nice Maaaan!",
                    text: "Nice, came on time and was very friendly",
        },{
            qualityRating: 4,
            punctualityRating: 4,
            creativityRating: 3,
            socialSkillsRating: 2,
            overallRating: 3,
                    id: 3,
                    reviewerName: "Josh",
                    chefName: "Michael Scott",
                    timeStamp: Date.now(),
                    title: "Okay!",
                    text: "He's okay, he came on time and was very friendly",
        }
    ]
};*/