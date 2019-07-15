import React, { PureComponent } from 'react';
import {DialogContainer, Button } from 'react-md';

export default class ScrollingContentAndSizing extends PureComponent {

    constructor (props) {
        super(props);
        this.state = {
            title: true,
            footer: true,
            height: null,
            width: null,
            visible: false,
            actions: [{
                label: 'Ok',
                primary: true,
                onClick: this.ok,
            }, {
                label: 'Cancel',
                secondary: true,
                onClick: this.hide,
            }]
        };
    }

    show = () => {
        this.setState({ visible: true });
    };

    ok = () =>{
        this.props.onClick();
    }
    hide = () => {
        console.log(this.state.visible);
        this.setState({ visible: false });
    };

    render() {
        return (
            <div style = {{marginTop: '10%'}}>
                {this.props.actionName === 'confirm' ?
                    <Button raised primary onClick={this.show}>{this.props.actionName}</Button>
                    :
                    <Button raised onClick={this.show}>{this.props.actionName}</Button>
                }
                        <DialogContainer
                    id="scrolling-content-dialog"
                    title='Confirm your operation'
                    visible={this.state.visible}
                    onHide={this.hide}
                    actions={this.state.actions}
                >
                    <p>
                        Do you really want to {this.props.actionName} this booking?
                    </p>
                </DialogContainer>
            </div>
        )
    }
}