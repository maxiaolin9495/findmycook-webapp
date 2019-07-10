import React from "react";
import {withRouter} from "react-router-dom";
import {Button, CardTitle, TextField, Card, CardText, FontIcon} from "react-md";


class AboutUs extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            email: '',
            firstName: '',
            message: '',
        }
    }


    render(){
        return (<Card className="md-cell md-cell--12 md-text-container" style={{ display: 'flex',
            width: '30%',
            margin: '0 auto',
            marginTop: '10%',
            background: 'white',
            minWidth: '200px'}}>
            <CardTitle title="About us" />
            <CardText>
                <Button raised primary onClick={this.sendMail} className="drawers__routing__send-btn">Send Mail!</Button>
                <FontIcon
                    className={cn('drawers__routing__send-icon', {
                        'drawers__routing__send-icon--active': sending,
                    })}
                >
                    send
                </FontIcon>
            </CardText>
        </Card>)
    }
}
export default withRouter(AboutUs);