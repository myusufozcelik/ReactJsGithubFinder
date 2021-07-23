import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class Navbar extends Component {
    render() {
        const {icon, title} = this.props
        return (
            <nav className="navbar navbar-dark bg-primary">
                <div className="container">
                <a href="#" className="navbar-brand">
                    <i className={icon}>{title}</i>
                </a>
                </div>
            </nav>
        )
    }
}

// default olarak obje oluşturuyoruz. Title bilgisi gelmezse buradaki bilgiyi alır
Navbar.defaultProps = { 
    title: 'Github',
    icon: 'fab fa-github'
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
}

export default Navbar
