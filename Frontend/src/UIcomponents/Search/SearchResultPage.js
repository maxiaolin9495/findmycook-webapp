import React, {Component} from 'react';
import SearchResultCard from '../../UIcomponents/Search/SearchResultCard';
import {Checkbox, Button, Divider, Slider} from 'react-md';

const cities = {
    City: ['Munich', 'Garching', 'Eching'],
}
const foodtypes = {
    Type: ['Asia Food', 'America Food', 'German Food', 'French Food'],
}

const prices = {
    Price: ['€ 0 - 25', '€ 25 - 50', '€ 50 - 75', '€ 75 - 100']
}

const testCard = (key, id, firstName, lastName, foodType, city, rating, introduction, price, photo) => <SearchResultCard
    key={key}
    id={id}
    firstName={firstName}
    lastName={lastName}
    foodtype={foodType}
    city={city}
    rating={rating}
    introduction={introduction}
    price={price}
    photo={photo}
/>;

class SearchResultPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            testCards: [],
            chefIds: [],
            city: [],
            foodtype: [],
            price: []
        };

    }

    componentWillReceiveProps(props) {
        props.data.map(data => this.state.chefIds.push(data._id));
        const testCards = props.data.map((data, i) => testCard(i, data._id, data.firstName, data.lastName, data.foodType, data.city, data.rating, data.introduction, data.price, data.photo));
        this.setState({testCards});
    }

    handlecitiescheckbox(isChecked, value) {
        if (isChecked) {
            this.state.city.push(value);
        } else {
            this.state.city.splice(this.state.city.indexOf(value), 1)
        }
    }

    handlefoodtypescheckbox(isChecked, value) {
        if (isChecked) {
            this.state.foodtype.push(value);
        } else {
            this.state.foodtype.splice(this.state.foodtype.indexOf(value), 1)
        }
    }

    handlepricescheckbox(isChecked, value) {
        let price = '';
        if (value === '€ 0 - 25') {
            price = '0'
        } else if (value === '€ 25 - 50') {
            price = '25'
        } else if (value === '€ 50 - 75') {
            price = '50'
        } else if (value === '€ 75 - 100') {
            price = '75'
        }
        if (isChecked) {
            this.state.price.push(price);
        } else {
            this.state.price.splice(this.state.price.indexOf(price), 1)
        }
    }

    handlefilter() {
        this.props.onFilter(this.state.chefIds, this.state.city, this.state.foodtype, this.state.price);
    }

    citiesCheckboxs = (cities) => {
        const rendered = [];
        let key = 0;
        rendered.push(<h3>City:</h3>);
        for (let city of cities.City) {
            rendered.push(<Checkbox
                className='filter-checkbox'
                key={key++}
                id={'checkbox-' + city}
                name={city}
                label={city}
                value={city}
                onChange={value => {
                    this.handlecitiescheckbox(value, city)
                }}
            />)
        }
        rendered.push(<Divider key={key++}/>)
        return rendered;

    };

    foodtypesCheckboxs = (handlecitiescheckbox) => {
        const rendered = [];
        let key = 0;
        rendered.push(<h3>Food Type:</h3>);
        for (let type of foodtypes.Type) {
            rendered.push(<Checkbox
                className='filter-checkbox'
                key={key++}
                id={'checkbox-' + type}
                name={type}
                label={type}
                value={type}
                onChange={value => {
                    this.handlefoodtypescheckbox(value, type);
                }}
            />)
        }
        rendered.push(<Divider key={key++}/>)
        return rendered;
    };

    pricesCheckboxs = (prices) => {
        const rendered = [];
        let key = 0;
        rendered.push(<h3>Price:</h3>);
        for (let price of prices.Price) {
            rendered.push(<Checkbox
                className='filter-checkbox'
                key={key++}
                id={'checkbox-' + price}
                name={price}
                label={price}
                value={price}
                onChange={value => {
                    this.handlepricescheckbox(value, price);
                }}
            />)
        }
        rendered.push(<Divider key={key++}/>)

        return rendered;
    };

    render() {
        return (
            <div style={{marginBottom: "40px"}}>
                <div style={{
                    marginTop: '20px',
                    width: '70%',
                    marginLeft: '5%',
                    height: '200px',
                    background: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    padding: '20px',
                    paddingBottom: '20px'
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        {this.citiesCheckboxs(cities)}
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        margin: '0 auto'
                    }}>
                        {this.foodtypesCheckboxs(foodtypes)}
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        margin: '0 auto'
                    }}>
                        {this.pricesCheckboxs(prices)}
                    </div>
                    <div style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row-reverse'
                    }}>
                        <div style={{width: '4%'}}>
                        </div>
                        <Button style={{
                            background: 'gray',
                            borderRadius: '10px',
                            color: 'white',
                            paddingLeft: '20px',
                            paddingRight: '20px',
                            paddingTop: '5px',
                            paddingBottom: '5px',
                            fontSize: '19px',
                            fontFamily: 'San Francisco'
                        }}
                                onClick={() => this.handlefilter()}>Filter</Button>
                    </div>
                </div>
                <div style={{
                    position: 'relative',
                }}>
                    {this.state.testCards}
                </div>
            </div>
        );
    }
}

export default SearchResultPage;
