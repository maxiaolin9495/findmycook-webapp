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
        setTimeout(() => window.scrollTo(0,0), 150);
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