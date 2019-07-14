import React from "react";
import Navigation from "../../UIcomponents/PageDesign/Navigation";  
import ChefReviewList from "../../UIcomponents/ReviewChef/ChefReviewList"; 
import Background from "../../Images/Homepage.jpg";
import ReviewChefService from "../../Services/ReviewChefService";

export class ReviewChefView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    createReview(review) {
        alert('Create review sent -by ReviewChefView');
        ReviewChefService.createReview(review).then((data) => {
            this.props.history.push('/');
        }).catch((e) => {
            console.error(e);
            this.setState(Object.assign({}, this.state, {error: 'Error while creating review'}));
        });  
    }
    
    render(){
      return (
        <div className = "reviewPage">
            <Navigation/>
            <ChefReviewList onSubmit={(review) => this.createReview(review)}/>

            <div className = "img-container">
                <img src={Background} className="bg"/>    
            </div>
        </div>
      )
    }
}






  

  

