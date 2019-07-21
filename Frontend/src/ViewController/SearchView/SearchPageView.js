"use strict";

import React from 'react';
import Background from '../../Images/Homepage.jpg';
import SearchBarComponent from "../../UIcomponents/Search/SearchBarComponent";
import '../../css/bg.css';
import Navigation from '../../UIcomponents/PageDesign/Navigation';
import LoginService from '../../Services/LoginService';
import EditProfile from '../../UIcomponents/PageDesign/EditProfile';
import UserService from '../../Services/UserService';

export class SearchPageView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    addProfile=(user)=>{
        UserService.addProfile(user).then((data) => {
            this.props.history.push('/');
        }).catch((e) => {
            console.error(e);
            this.setState({
                error: e
            });
        });
    }

    editProfile=()=>{
        setTimeout(() => window.scrollTo(0,0), 150);
        if(LoginService.isAuthenticated()){
            let withProfile = UserService.getCurrentUser().withProfile;
            if(withProfile ==='No') {
                return true;
            }
            return false;
        }
        return false;
    }

    render() {
        return <div>
                <Navigation/>
                <section>
                    <img src={Background} className="bg"/>
                    {this.editProfile()?<EditProfile onSubmit={(user) => this.addProfile(user)} error={this.state.error}/>
                        :<div style={{marginTop: '25%', position: 'relative'}}>
                            <SearchBarComponent/>
                        </div>
                    }
                </section>
            </div>
    }

}
