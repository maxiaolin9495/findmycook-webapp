import React from "react";
import Navigation from "../../UIcomponents/PageDesign/Navigation";  
import ChefReviewList from "../../UIcomponents/ReviewChef/ChefReviewList"; 
import Background from "../../Images/Homepage.jpg";
import ReviewChefService from "../../Services/ReviewChefService";
import ChefService from "../../Services/ChefService";

export class ReviewChefView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chef: []
        };
    }

    componentWillMount() {
        let chefid = this.props.match.params.id;
        ChefService.getChefDetail(chefid).then((data) => {
            this.setState({chef: data});
        }).catch((e) => {
            console.error(e);
        });
    }

    createReview(review) {
        alert('Thank you for your feedback');
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
            <ChefReviewList onSubmit={(review) => this.createReview(review)} chef={this.state.chef}/>

            <div className = "img-container">
                <img src={Background} className="bg"/>    
            </div>
        </div>
      )
    }
}






  

  

