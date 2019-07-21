import React from 'react';
import ChefService from "../../Services/ChefService";
import ChefDetail from '../../UIcomponents/Search/ChefDetail';
import Navigation from '../../UIcomponents/PageDesign/Navigation';
import ReviewChefService from "../../Services/ReviewChefService";

export class ChefDetailView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            chef: [],
            reviews: []
        };
    }

    componentWillMount() {
        this.setState({
            loading: true
        });
        let chefid = this.props.match.params.id;
        //console.log(this.props.match.params.id);
        ChefService.getChefDetail(chefid).then((data) => {
            this.setState({
                chef: data,
                loading: false
            });
        }).catch((e) => {
            console.error(e);
        });

        ReviewChefService.getReviews().then((reviews) => {
            this.setState({
                reviews: [...reviews].filter(review => review.chefName === this.state.chef.firstName + ' ' + this.state.chef.lastName),
                loading: false
            });
        }).catch((e) => {
            console.error(e);
        });
    }

    calculateOverallRating(){
        let result = this.state.reviews.reduce((acc, val) => {
            return val.chefName == this.state.chef.firstName + ' ' + this.state.chef.lastName ? acc + val.overallRating : acc;
          }, 0);
        //console.log(this.state.reviews);
        return Math.round(result/ this.state.reviews.length);
    }

    render() {

        return (
            <div>
                <Navigation/>
                <ChefDetail
                    loading={this.state.loading}
                    chef={this.state.chef}
                    reviewsAmount={this.state.reviews.length} 
                    averageOverallRating = {this.calculateOverallRating()}
                    />
                </div>
        );
    }
}
