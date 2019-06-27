import {Checkbox, TextField} from 'react-md';
import React from 'react';
import {withRouter} from 'react-router-dom';

class Languages extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div hidden={false} id="language-List" style={{width: '100%'}}>
                <Checkbox
                    id="custom-checkbox-icon-1"
                    name="using-custom-icons"
                    label="English"
                    style={{
                        marginLeft: 'auto',
                        marginRight: 'auto',
                    }}
                />
                <Checkbox
                    id="custom-checkbox-icon-2"
                    name="using-custom-icons"
                    label="German"
                />
                <Checkbox
                    id="custom-checkbox-icon-3"
                    name="using-custom-icons"
                    label="Chinese"
                />
                <Checkbox
                    id="custom-checkbox-icon-4"
                    name="using-custom-icons"
                    label="Japanese"
                />
                <Checkbox
                    id="custom-checkbox-icon-5"
                    name="using-custom-icons"
                    label="French"
                />
                <Checkbox
                    id="custom-checkbox-icon-6"
                    name="using-custom-icons"
                    label="Italian"
                />
                <TextField
                    id="floating-center-otherLanguages"
                    label="Other"
                    lineDirection="center"
                    placeholder="If you can other language, please directly input them in"
                />
            </div>
        )
    }
}
export default withRouter(Languages);
