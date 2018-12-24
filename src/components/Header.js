import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {

    signOut = () => {
        localStorage.clear();
        this.forceUpdate();
        // this.props.history.push('/')
    }
    render() {
        return (
            <header style={styles.header}>
                <Link to='/' style={styles.title}>{this.props.title}</Link>
                {(localStorage.getItem('token') == null) ? 
                <div>
                    <Link style={styles.linkStyle} to='/signin'>Sign In</Link>
                    <Link style={styles.linkStyle} to='/register'>Register</Link>
                </div> :
                <Link onClick={this.signOut} style={styles.linkStyle} to='/signin'>Sign Out</Link>
            }
            </header>
        )
    }
}

const styles = {
    header: {
        width: '100%',
        backgroundColor: '#E10098',
        color: 'white',
        padding: '20px',
        boxShadow: '0 0 3px gray',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxSizing: 'border-box'
    },
    title: {
        margin: '0',
        fontSize: '26px',
        fontWeight: 'bold',
        color: 'white',
        textDecoration: 'none'
    },
    linkStyle: {
        color: 'white',
        textDecoration: 'none',
        marginRight: '20px'
    },
    signoutBtn: {
        border: 'none',
        backgroundColor: 'transparent',
        color: 'white',
        fontSize: '16px'
    }
}