import React from "react";
import Navigation from "../../UIcomponents/PageDesign/Navigation";
import Background from "../../Images/Homepage.jpg";
import LoginTab from "../../UIcomponents/PageDesign/Login";

export class LoginView extends React.Component {
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
                    <LoginTab/>
                </section>
            </div>

        )
    }
}