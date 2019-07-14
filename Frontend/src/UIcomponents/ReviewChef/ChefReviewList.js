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

    deleteReview(id) {
        ReviewChefService.deleteReview(id).then((message) => {
            this.props.history.push('/');
        }).catch((e) => {
            console.log(e);
        });
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
        <ChefReviewDetails review={review} deleteReview={this.deleteReview}/>
        ));
        
    }
}

export default withRouter(ChefReviewList);