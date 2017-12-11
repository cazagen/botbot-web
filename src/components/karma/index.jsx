import React from 'react';
import axios from '../../axios';
import { Button, Input, Row, Col } from 'react-materialize'


class Karma extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            karma: {},
            sortingMethod: 'num-desc',
            searchTerm: ''
        }
    }

    sortItems(left, right) {
        switch (this.state.sortingMethod) {
            case 'alpha-asc':
            default:
                return left.key.localeCompare(right.key)
            case 'alpha-desc':
                return right.key.localeCompare(left.key)
            case 'num-asc':
                return left.value - right.value
            case 'num-desc':
                return right.value - left.value
        }
    }

    setSortingMethod(sortingMethod) {
        this.setState({
            sortingMethod: sortingMethod
        })
    }

    handleSearch(e) {
        this.setState({
            searchTerm: e.target.value
        })
    }

    componentDidMount() {
        axios.get('/karma')
            .then(karma => {
                this.setState({
                    karma: karma.data
                })
            })
    }

    render() {
        var items = Object.keys(this.state.karma).map((key, idx) => {
            return {key: key, value: parseInt(this.state.karma[key])}
        })

        items = items.filter(item => item.key.includes(this.state.searchTerm));

        items.sort(this.sortItems.bind(this));

        items = items.map((item, idx) => (
            <li className={idx % 2 == 0 ? 'red lighten-5' : ''} key={item.key}>{item.key} <span className='right'>{item.value}</span></li>
        ))

        return (
            <Row>
                <Col s={12} l={8} offset="l2">
                    <span className='right'>
                        <Input s={12} label='Search' onChange={this.handleSearch.bind(this)} value={this.state.searchTerm}></Input>
                    </span>

                    <h2>
                        Karma
                    </h2>

                    <div className="clearfix"></div>

                    <Button floating fab='vertical' icon='sort' className='red' large>
                        <Button onClick={this.setSortingMethod.bind(this, 'num-asc')} floating className='blue'><i className="fa fa-sort-numeric-asc"></i></Button>
                        <Button onClick={this.setSortingMethod.bind(this, 'num-desc')} floating className='blue'><i className="fa fa-sort-numeric-desc"></i></Button>
                        <Button onClick={this.setSortingMethod.bind(this, 'alpha-asc')} floating className='orange'><i className="fa fa-sort-alpha-asc"></i></Button>
                        <Button onClick={this.setSortingMethod.bind(this, 'alpha-desc')} floating className='orange'><i className="fa fa-sort-alpha-desc"></i></Button>
                    </Button>

                    <ul>
                        {items}
                    </ul>
                </Col>
            </Row>
        )
    }
}

export default Karma;