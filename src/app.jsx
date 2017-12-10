import React from 'react';
import {
    HashRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import { Row, Col } from 'react-materialize'

import Toolbar from './components/toolbar'
import Karma from './components/karma'

const Home = () => (
    <div><h2>Home</h2></div>
);

class App extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Router>
                <div>
                    <Toolbar />
                    <Row>
                        <Col l={8} s={12} offset='l2'>
                            <Route exact path='/' component={Home} />
                            <Route path='/karma' component={Karma} />
                        </Col>
                    </Row>

                </div>
            </Router>
        )
    }
}

export default App;