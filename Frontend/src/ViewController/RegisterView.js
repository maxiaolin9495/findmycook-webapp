import React from "react";
import Navigation from "../UIcomponents/PageDesign/Navigation";
import Background from "../Images/Homepage.jpg";
import RegisterTab from "../UIcomponents/PageDesign/Register";
import RegisterService from "../Services/RegisterService";

export class RegisterView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

    }

    register=(user)=> {
        RegisterService.register(user.email, user.password, user.userType).then((data) => {
            this.props.history.push('/');
        }).catch((e) => {
            console.error(e);
            this.setState({
                error: e
            });
        })
    }

    render() {
        return (
            <div>
                <Navigation/>
                <section>
                    <img src={Background} className="bg"/>
                    <RegisterTab onSubmit={(user) => this.register(user)} error={this.state.error}/>
                </section>
            </div>

        )

    }
}