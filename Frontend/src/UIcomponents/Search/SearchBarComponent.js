import React from 'react';
import {withRouter} from 'react-router-dom'
import SearchBar from 'material-ui-search-bar';
import {Button} from 'react-md';

class SearchBarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: ''
        };
    }

    searchBySearchBar =() =>{
        if(this.state.searchValue === '') {
            alert('Please input a city name');
            return;
        }
        this.props.history.push(`/searchresult?query=${this.state.searchValue}`)
    }
    render() {
        return (
            <div>
                <div style={{
                    display: 'flex',
                    width: '60%',
                    margin: '0 auto'
                }}>
                    <SearchBar className={"searchtoolbar"}
                               placeholder={'Search City e.g Munich'}
                               onChange={(value) => this.setState({searchValue: value})}
                               onRequestSearch={() => this.searchBySearchBar()}
                               style={{
                                   flex: '1'
                               }}
                    />
                    <Button raised primary swapTheming style={{
                        height: '47px',
                        fontSize: '15px',
                        background: 'blue',
                        color: 'white'
                    }} onClick={() => this.searchBySearchBar()}
                    >Search</Button>
                </div>

            </div>
        );
    }
}

export default withRouter(SearchBarComponent);
