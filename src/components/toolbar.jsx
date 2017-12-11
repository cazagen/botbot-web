import React from 'react';
import { Navbar } from 'react-materialize';
import { NavLink } from 'react-router-dom';

class Toolbar extends React.Component {
    render() {
        return (
            <Navbar brand='Botbot' left>
                <li><NavLink to='/'>Home</NavLink></li>
                <li><NavLink to='/karma'>Karma</NavLink></li>
                <li><NavLink to='/reactions'>Reactions</NavLink></li>
            </Navbar>
        )
    }
}

export default Toolbar;