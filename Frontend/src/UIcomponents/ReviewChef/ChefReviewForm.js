import React from 'react'
import StarRatingComponent from 'react-star-rating-component';
import {Button, TextField, } from 'react-md';
import UserService from "../../Services/UserService";
import '../../css/review.css';

export class ChefReviewForm extends React.Component {
   
    constructor(props) {
        super(props);
        this.state = {
            time: new Date().toLocaleDateString(),
            reviewerName: '',
            chefName: '',
            title: '',
            qualityRating: 1,
            punctualityRating: 1,
            creativityRating: 1,
            socialSkillsRating: 1,
            text: '',
            customerName: ''
        }

        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount(){
        let customerName = UserService.getCurrentUser();
        this.setState({customerName: customerName.firstName + ' ' + customerName.lastName});
        this.setState({chefName: this.props.chef.firstName + ' ' + this.props.chef.lastName});
    }

    handleChangeTitle(value) {
        this.setState(Object.assign({}, this.state, {title: value}));
    }

    handleChangeText(value) {
        this.setState(Object.assign({}, this.state, {text: value}));
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.title == '' || this.state.text == ''){
            alert('Please fill in the required fields')
            return;
        }
        let review = this.props.review;
        if (review == undefined) {
            review = {};
        }
        review.time = this.state.time
        review.qualityRating = this.state.qualityRating;
        review.punctualityRating = this.state.punctualityRating;
        review.creativityRating = this.state.creativityRating;
        review.socialSkillsRating = this.state.socialSkillsRating;
        review.reviewerName = this.state.customerName;
        review.chefName = this.state.chefName;
        review.title = this.state.title; 
        review.text = this.state.text;
        review.overallRating = Math.round((this.state.qualityRating +
            this.state.punctualityRating +
            this.state.creativityRating +
            this.state.socialSkillsRating) /4);
        this.setState({title: ''});
        this.setState({text: ''});
        this.setState({qualityRating: 1});
        this.setState({punctualityRating: 1});
        this.setState({creativityRating: 1});
        this.setState({socialSkillsRating: 1});
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

        return (
            <div className="md-grid" id="reviewTable" label="Review" style={{
                display: 'flex',
                maxWidth: '60%',
                marginTop: '2%',
                position:'relative',
                background: 'rgb(255,255,255,0.8)'
                }}>

                <div className = "chef-container" style = {{marginTop: '0.5%'}}>
                    <img src={this.props.chef.photo}/>   
                    <h3 style = {{marginTop: '2%'}}>Chef</h3>
                    <h1 style = {{marginTop: '-2%'}}>{this.state.chefName}</h1>
                    <div className = "overallRating"> 
                        <h1>
                        <StarRatingComponent 
                            name="rateOverall" 
                            starCount={5}
                            value={this.props.averageOverallRating} 
                            editing={false}
                        />
                        </h1>
                        <h3 style = {{marginTop:'-5%', marginLeft: '1.1%'}}>{this.props.reviewsAmount} review(s)</h3>
                        <h6 style = {{color:'gray', marginLeft: '1.1%'}}>*scroll down to see all the reviews</h6>
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
                    rows={4}
                    paddedBlock
                    style={{marginLeft: '1px', width: '100%'}}
                    maxLength={1000}
                    errorText="Max 1000 characters."
                />
                </div>

                <form onSubmit={this.handleSubmit}>
                <input type="submit" value="Submit" style={{
                            marginTop: '10%',
                            marginBottom: '10%',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            width: '50%',
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
