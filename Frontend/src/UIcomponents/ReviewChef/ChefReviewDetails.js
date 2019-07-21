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
                <h4>{this.props.review.reviewerName} 
                
                <h4 >
                <StarRatingComponent 
                            name="rateOverall" 
                            starCount={5}
                            value={this.props.review.overallRating}
                            editing={false}
                        />
                <h6 style = {{marginTop: '-2%', color: 'gray'}}>
                    {this.props.review.time}
                </h6>
                </h4>

                <h3 style = {{display: 'inline-block'}}>
                    {this.props.review.title}
                </h3>

                <p style = {{marginTop: '-1%'}}> 
                    {this.props.review.text} 
                </p>
                
                </h4>
            </div>
        )
    }
}

ChefReviewDetails.propTypes = {
    review: PropTypes.object.isRequired,
}



export default withRouter(ChefReviewDetails);
