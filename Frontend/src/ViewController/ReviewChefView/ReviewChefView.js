import React from "react";
import Navigation from "../../UIcomponents/PageDesign/Navigation";  
import ChefReviewList from "../../UIcomponents/ReviewChef/ChefReviewList"; 
import ChefReviewForm from '../../UIcomponents/ReviewChef/ChefReviewForm';
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
                <ChefReviewForm onSubmit={(review) => this.createReview(review)} />

                <div>
                <h3 style = {{
                    display: 'flex',
                    width: '60%',
                    padding: '10px',
                    marginTop: '2%',
                    marginLeft: '20%',
                    marginBottom: '0%',
                    color: 'white',
                    background: 'rgb(75,140,209,1)'}}>Reviews</h3>
                </div>

                <ChefReviewList/>
                
            <div className = "img-container">
                <img src={Background} className="bg"/>    
            </div>
        </div>
      )
    }
}






  

  

