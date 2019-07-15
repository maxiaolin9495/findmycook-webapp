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
        let chefid = this.props.match.params.id;
        console.log(this.props.match.params.id);
        ChefService.getChefDetail(chefid).then((data) => {
            this.setState({
                chef: data,
                loading: false
            });
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
