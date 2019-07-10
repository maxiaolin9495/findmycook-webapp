import React from 'react';
import AboutUs from '../UIcomponents/PageDesign/AboutUs';
import Navigation from "../UIcomponents/PageDesign/Navigation";
import Background from "../Images/Homepage.jpg";

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
            <div>
                <Navigation/>
                <section>
                    <img src={Background} className="bg"/>
                    <AboutUs/>
                </section>
            </div>
        );
    }
}