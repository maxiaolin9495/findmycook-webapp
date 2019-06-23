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
            error: undefined
        };
    }

    componentWillMount(props) {
        this.setState({
            loading: true
        });

        ChefService.getChefbysearch(this.props.location.search.split('=')[1]).then((data) => {
            this.setState({
                data: [...data],
                loading: false
            });
        }).catch((e) => {
            console.error(e);
        });

    }

    filterchef(chefIds, city, foodtype, price) {
        ChefService.filterchef(chefIds, city, foodtype, price).then((data) => {
            this.setState({
                data: data,
                loading: false
            });
        }).catch((e) => {
            console.error(e + ' Error while updating movie');
            this.setState(Object.assign({}, this.state, {error: 'Error while updating movie'}));
        });
    }

    render() {

        return (
            <div>
                <Navigation/>
                <img src={Background} className="bg"/>
                <SearchResultPage data={this.state.data}
                                  onFilter={(chefIds, city, foodtype, price) => this.filterchef(chefIds, city, foodtype, price)}
                                  error={this.state.error}/>
            </div>
        );
    }
}
