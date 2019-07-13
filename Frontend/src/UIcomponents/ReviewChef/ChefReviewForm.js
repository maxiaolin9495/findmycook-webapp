import React from 'react'
import StarRatingComponent from 'react-star-rating-component';
import {Button, TextField, } from 'react-md';
import ChefPicture from "../../Images/chef_michael.jpg";
import '../../css/review.css'
import ReviewChefService from '../../Services/ReviewChefService';

export class ChefReviewForm extends React.Component {
   
    constructor(props) {
        super(props);
        this.state = {
            time: Date.now(),
            reviewerName: '',
            chefName: "Michael Scott",
            title: '',
            qualityRating: 1,
            punctualityRating: 1,
            creativityRating: 1,
            socialSkillsRating: 1,
            overallRating: 1,
            text: ''
        }

        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChangeTitle(value) {
        this.setState(Object.assign({}, this.state, {title: value}));
    }

    handleChangeText(value) {
        this.setState(Object.assign({}, this.state, {text: value}));
    }

    handleSubmit(event) {
        alert('Thank you for your feedback');
        event.preventDefault();

        let review = this.props.review;
        if (review == undefined) {
            review = {};
        }
        review.qualityRating = this.state.qualityRating;
        review.punctualityRating = this.state.punctualityRating;
        review.creativityRating = this.state.creativityRating;
        review.socialSkillsRating = this.state.socialSkillsRating;
        review.reviewerName = this.state.reviewerName;
        review.chefName = this.state.chefName;
        review.title = this.state.title; 
        review.text = this.state.text;

        this.setState({title: 'title deleted'});
        this.setState({text: 'text deleted'});
        this.setState({qualityRating: 1});
        this.setState({punctualityRating: 1});
        this.setState({creativityRating: 1});
        this.setState({socialSkillsRating: 1});

        this.props.onSubmit(review);
    }

    updateOverallRating(){
        this.setState({overallRating: ((this.state.qualityRating+
            this.state.punctualityRating+
            this.state.creativityRating+
            this.state.socialSkillsRating)/4)});
    }
    
    onStarClickQualityRating(nextValue, prevValue, name) {
        this.setState({qualityRating: nextValue});
        this.updateOverallRating();
    }

    onStarClickPunctualityRating(nextValue, prevValue, name) {
        this.setState({punctualityRating: nextValue});
        this.updateOverallRating();
    }

    onStarClickCreativityRating(nextValue, prevValue, name) {
        this.setState({creativityRating: nextValue});
        this.updateOverallRating();
    }

    onStarClicksocialSkillsRating(nextValue, prevValue, name) {
        this.setState({socialSkillsRating: nextValue});
        this.updateOverallRating();
    }

    render() {
        const { qualityRating } = this.state;
        const { punctualityRating } = this.state;
        const { creativityRating } = this.state;
        const { socialSkillsRating } = this.state;
        const { overallRating } = this.state;
        

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
                    <h1>{this.state.chefName}</h1>
                    <div className = "overallRating"> 
                        <h1>
                        <StarRatingComponent 
                            name="rateOverall" 
                            starCount={5}
                            value={overallRating}
                            editing={false}
                        />
                        </h1>
                        <h2>354 reviews</h2>
                    </div>
                    
                </div>

                <div className = "reviewForm" style = {{marginTop: '0.5%', color : '#FFFFFF', marginLeft: '3%'}}>
                <h1>Review your chef </h1>
                <TextField
                    id="reviewTitle"
                    label="Title"
                    required
                    value={this.state.title}
                    onChange={this.handleChangeTitle}
                    lineDirection="center"
                    placeholder="Add title"
                    errorText="required"
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
                    value= {this.state.text}
                    onChange={this.handleChangeText}
                    lineDirection="center"
                    placeholder="Please write your review"
                    errorText="required"
                />
                </div>

                <form onSubmit={this.handleSubmit}>
                <input type="submit" value="Submit" style={{
                            marginTop: '10%',
                            marginBottom: '10%',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            width: '200%',
                            lineHeight: '25px',
                            fontSize: '16px',
                            backgroundColor: 'rgb(69,150,236)',
                            color: 'white'
                        }}/>
                </form>

                </div>

            </div>
        )
    }
}

export default ChefReviewForm
