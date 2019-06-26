import React from "react";
import Navigation from "../../UIcomponents/PageDesign/Navigation";
import Background from "../../Images/Homepage.jpg";
import RegisterTab from "../../UIcomponents/PageDesign/Register";

export class RegisterView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            LoggedIn:false
        }

    }

    render() {
        return (
            <div>
                <Navigation/>
                <section>
                    <img src={Background} className="bg"/>
                    <RegisterTab/>
                </section>
            </div>

        )

    }
}