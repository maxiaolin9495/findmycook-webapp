import React from "react";
import {withRouter} from "react-router-dom";
import {CardTitle, CardText} from "react-md";


class AboutUs extends React.Component {
    constructor(props) {
        super(props);
        this.state={}
    }


    render(){
        return (<div className="md-grid" id="AboutUsTable" label=""  style={{
            display: 'flex',
            width: '30%',
            margin: '0 auto',
            marginTop: '10%',
            background: 'white',
            minWidth: '200px'
        }}>
                <CardTitle title="About us" id='AboutUsTitle' style={{
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}/>
                <CardText>
                    <p>
                        FindMyCook is a platform that lists chefs from
                        different backgrounds to help private households cook delicious meals.
                    </p>
                </CardText>
        </div>)
    }
}
export default withRouter(AboutUs);