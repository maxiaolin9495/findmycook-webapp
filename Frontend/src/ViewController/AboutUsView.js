import React from 'react';
import AboutUs from '../UIcomponents/PageDesign/AboutUs';

export class AboutUsView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: [],
        };
    }

    render() {
        return (
            <AboutUs/>
        );
    }
}