"use strict";

import React from 'react';
import Background from '../../Images/Homepage.jpg';
import '../../css/bg.css';

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
                    </div>
            </section>

        )

    }

}
