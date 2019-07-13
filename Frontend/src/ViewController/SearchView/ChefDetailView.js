import React from 'react';

import ChefService from "../../Services/ChefService";
import ChefDetail from '../../UIcomponents/Search/ChefDetail';
import Navigation from '../../UIcomponents/PageDesign/Navigation';

export class ChefDetailView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            chef: [],
        };
    }

    componentWillMount() {
        this.setState({
            loading: true
        });
        let id = this.props.match.params.id;
        ChefService.getChefDetail(id).then((data) => {
            this.setState({
                chef: data,
                loading: false
            });
            console.log(chef);
        }).catch((e) => {
            console.error(e);
        });

    }

    render() {

        return (
            <div>
                <Navigation/>
                <ChefDetail
                    loading={this.state.loading}
                    chef={this.state.chef}/>
            </div>
        );
    }
}
