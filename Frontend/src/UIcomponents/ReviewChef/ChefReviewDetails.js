import React from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import StarRatingComponent from 'react-star-rating-component';

class ChefReviewDetails extends React.Component {

    getStyle = () => {
        return {
            display: 'flex',
            marginLeft: '20%',
            marginBottom: '0.5%',
            opacity: 0.8,
            width: '60%',
            background: '#f4f4f4',
            padding: '6px',
            borderBottom: '1px #ccc dotted',
        }
    }

    render() {
        return (
            <div style={this.getStyle()}>
                <h3>
            
                {this.props.review.review.title}

                <h4>
                <StarRatingComponent 
                            name="rateOverall" 
                            starCount={5}
                            value={this.props.review.overallRating}
                            editing={false}
                        />
                </h4>

                <p> { this.props.review.review.text } </p>

                <button onClick={this.props.deleteReview.bind(this, this.props.review.review.id)}>Remove</button>
                </h3>
                
            </div>
        )
    }
}

ChefReviewDetails.propTypes = {
    review: PropTypes.object.isRequired,
}



export default withRouter(ChefReviewDetails);
