import React from 'react';
import SearchResultPage from '../../UIcomponents/Search/SearchResultPage';
import Background from '../../Images/searchresultbg.jpg';
import '../../css/bg.css';
import ChefService from "../../Services/ChefService";
import Navigation from '../../UIcomponents/PageDesign/Navigation.js';

export class SearchResultView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: [],
            filteredData:[],
            error: undefined
        };
    }

    componentWillMount(){
        this.setState({
            loading: true
        });

        ChefService.getChefBySearchCity(this.props.location.search.split('=')[1]).then((data) => {
            this.setState({
                data: [...data],
                filteredData: [...data],
                loading: false
            });
        }).catch((e) => {
            console.error(e);
        });
    }

    filterChef =(chefIds, city, foodType, price) =>{
        ChefService.filterChef(chefIds, city, foodType, price).then((data) => {
            this.setState({
                filteredData: data,
                loading: false
            });
        }).catch((e) => {
            console.error(e + ' Error while updating chef');
            this.setState(Object.assign({}, this.state, {error: 'Error while updating chef'}));
        });
    }

    render() {
        setTimeout(() => window.scrollTo(0,0), 150);
        return (
            <div>
                <Navigation/>
                <img src={Background} className="bg"/>
                <SearchResultPage
                                  data={this.state.data}
                                  filteredData={this.state.filteredData}
                                  onFilter={(chefIds, city, foodType, price) => this.filterChef(chefIds, city, foodType, price)}
                                  error={this.state.error}/>
            </div>
        );
    }
}
