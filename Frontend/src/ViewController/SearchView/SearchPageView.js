"use strict";

import React from 'react';
import Background from '../../Images/Homepage.jpg';
import SearchBarComponent from "../../UIcomponents/Search/SearchBarComponent";
import '../../css/bg.css';
import Navigation from '../../UIcomponents/PageDesign/Navigation.js';

export class SearchPageView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: ''
        }

    }

    render() {
          return (
            <section>

                <img src={Background} className="bg"/>
                <div style={{marginTop: '25%', position: 'relative'}}>
                <SearchBarComponent/>
                    </div>
            </section>

        )

    }

}
