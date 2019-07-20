import React from 'react';
import {Button} from "react-md/es";
import {withRouter} from 'react-router-dom';

class ChefWorkTimeDetail extends React.Component {

    getStyle = () => {
        return {
            display: 'flex',
            marginLeft: '20%',
            marginBottom: '0.2%',
            opacity: 0.8,
            width: '60%',
            background: 'black',
            padding: '6px',
        }
    }

    render() {
            return (
                <div style={this.getStyle()}>
                    
                    <h3 style={{color: 'white'}}>{new Date(parseInt(this.props.workTime.startTime)).toLocaleDateString()} </h3>
                    
                    <h4 style={{color: 'white', marginLeft:'20%'}}>from</h4>
                    <h3 style={{color: 'white', marginLeft: '3%'}}> 
                        {(new Date(parseInt(this.props.workTime.startTime)).toLocaleTimeString()).substring(0,5)}
                    </h3>

                    <h4 style={{color: 'white', marginLeft: '3%'}}>to</h4>
                    <h3 style={{color: 'white', marginLeft: '3%'}}> 
                        {(new Date(parseInt(this.props.workTime.endTime)).toLocaleTimeString()).substring(0,5)} 
                    </h3>
                    <Button flat 
                        onClick={() => this.props.deleteWorktime(this.props.workTime._id)} 
                        style={{
                             fontSize: '12px',
                             textAlign: 'center',
                             height: '6%',
                             width: '5%',
                             color: 'white',
                             position: 'relative',
                             background: 'red',
                             marginLeft: '35%',
                             marginTop: '2%',
                             marginBottom: '2%'
                         }}>Delete</Button>
        
                </div>
            )
        }
    }

export default withRouter(ChefWorkTimeDetail);
