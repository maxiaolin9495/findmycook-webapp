import React, { Component } from 'react'
import StarRatingComponent from 'react-star-rating-component';
import {Button, TextField, } from 'react-md';
import ChefPicture from "../../Images/chef_michael.jpg";
import '../../css/review.css'
import ReviewChefService from '../../Services/ReviewChefService';

export class ChefReviewForm extends Component {
   
    constructor(props) {
        super(props);
        this.state = {
            qualityRating: 1,
            punctualityRating: 1,
            creativityRating: 1,
            socialSkillsRating: 1,
            overallRating: 1,
            review: {
                    id: 1,
                    reviewerName: "test reviewer's name",
                    chefName: "Michael Scott",
                    timeStamp: Date.now(),
                    title: '',
                    text: '',
            }
        }

        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeTitle(value) {
        this.setState(Object.assign({}, this.state, {title: value}));
    }

    handleSubmit(event) {
        event.preventDefault();

        let review = this.props.review;
        review = {}
        review.qualityRating = this.state.qualityRating;
        review.punctualityRating = this.state.punctualityRating;
        review.creativityRating = this.state.creativityRating;
        review.socialSkillsRating = this.state.socialSkillsRating;
        review.id = this.state.review.id;
        review.reviewerName = this.state.review.reviewerName;
        review.chefName = this.state.review.chefName;
        review.title = this.state.review.title;
        review.text = this.state.review.text;

        this.props.onSubmit(review);
    }
    
    onStarClickQualityRating(nextValue, prevValue, name) {
        this.setState({qualityRating: nextValue});
    }

    onStarClickPunctualityRating(nextValue, prevValue, name) {
        this.setState({punctualityRating: nextValue});
    }

    onStarClickCreativityRating(nextValue, prevValue, name) {
        this.setState({creativityRating: nextValue});
    }

    onStarClicksocialSkillsRating(nextValue, prevValue, name) {
        this.setState({socialSkillsRating: nextValue});
    }

    render() {
        const { qualityRating } = this.state;
        const { punctualityRating } = this.state;
        const { creativityRating } = this.state;
        const { socialSkillsRating } = this.state;
        const { title } = this.state.review;

        return (
            <div className="md-grid" id="reviewTable" label="Review" style={{
                display: 'flex',
                width: '60%',
                marginTop: '2%',
                background: 'rgb(255,255,255,0.8)'
                }}>

                <div className = "chef-container" style = {{marginTop: '0.5%'}}>
                    <img src={ChefPicture}/>   
                    <h3>Chef</h3>
                    <h1>{this.state.review.chefName}</h1>
                    <div className = "overallRating"> 
                        <h1>
                        <StarRatingComponent 
                            name="rateOverall" 
                            starCount={5}
                            value={(qualityRating+punctualityRating+creativityRating+socialSkillsRating)/4}
                            editing={false}
                        />
                        <h2>354 reviews</h2>
                        </h1>
                    </div>
                    
                </div>

                <div className = "reviewForm" style = {{marginTop: '0.5%', color : '#FFFFFF', marginLeft: '3%'}}>
                <h1>Review your chef </h1>
                <TextField
                    id="reviewTitle"
                    label="Title"
                    required
                    value={title}
                    onChange={this.handleChangeTitle}
                    lineDirection="center"
                    placeholder="Add title"
                    errorText="Title is required"
                />
                <div className = "qualityRating" style={{ marginTop: '10%'}}>
                    <h3>Quality {qualityRating}/5</h3>
                    <h2>
                    <StarRatingComponent 
                    name="qualityRating" 
                    starCount={5}
                    value={qualityRating}
                    onStarClick={this.onStarClickQualityRating.bind(this)}
                    />
                    </h2>
                </div>
                
                <div className = "punctualityRating" style={{ marginTop: '10%'}}>   
                <h3>Punctuality {punctualityRating}/5 </h3>
                <h2>
                <StarRatingComponent 
                    name="punctualityRating" 
                    starCount={5}
                    value={punctualityRating}
                    onStarClick={this.onStarClickPunctualityRating.bind(this)}
                />
                </h2>
                </div>

                <div className = "creativityRating" style={{ marginTop: '10%'}}>   
                <h3>Creativity {creativityRating}/5 </h3>
                <h2>
                <StarRatingComponent 
                    name="creativityRating" 
                    starCount={5}
                    value={creativityRating}
                    onStarClick={this.onStarClickCreativityRating.bind(this)}
                />
                </h2>
                </div>

                <div className = "socialSkillsRating" style={{ marginTop: '10%'}}>
                <h3>Social Skills {socialSkillsRating}/5</h3>
                <h2>
                <StarRatingComponent 
                    name="socialSkillsRating" 
                    starCount={5}
                    value={socialSkillsRating}
                    onStarClick={this.onStarClicksocialSkillsRating.bind(this)}
                />
                </h2>
                </div>
 
                <div id = "reviewTextBox">
                <TextField
                    id="reviewText"
                    label="Review"
                    required
                    value= {this.state.review.text}
                    lineDirection="center"
                    placeholder="Please write your review"
                />
                </div>

                <div className = "SubmitButton">
                <Button id="submit" 
                        type="submit"
                        flat primary swapTheming
                        style={{
                            marginTop: '10%',
                            marginBottom: '10%',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            width: '200%'
                        }}>Submit</Button>
                </div>

                </div>

            </div>
        )
    }
}

export default ChefReviewForm
