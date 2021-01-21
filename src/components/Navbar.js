import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';

const Navbar = ({ logout, isAuthenticated }) => {
    console.log({"Authenticated?": isAuthenticated});
    const [redirect, setRedirect] = useState(false);

    const logout_user = () => {
        logout();
        setRedirect(true);
    }

    return (
        <>
        <nav class='navbar navbar-expand-lg navbar-light bg-light'>
            <a class='navbar-brand' href='/'>TopThree</a>
            <button 
                class='navbar-toggler'
                type='button'
                data-toggle='collapse'
                data-target='#navbarNav'       
                aria-controls='navbarNav' 
                aria-expanded='false' 
                aria-label='Toggle navigation'>
                <span class='navbar-toggler-icon'></span>
            </button>
            <div class='collapse navbar-collapse' id='navbarNav'>
                <ul class='navbar-nav'>
                    <li class='nav-item active'>
                        <Link class='nav-link' to='/'>Home <span class='sr-only'>(current)</span></Link>
                    </li>
                    { !isAuthenticated ?
                            (
                                <>
                                    <li class='nav-item'>
                                        <Link class='nav-link' to='/login'>Login</Link>
                                    </li>
                                    <li class='nav-item'>
                                        <Link class='nav-link' to='/signup'>Signup</Link>
                                    </li>
                                </>
                            )
                        : 
                            (
                                <>
                                    <li class='nav-item'>
                                        <a class='nav-link' href='/create-list'>+ New List</a>
                                    </li>
                                    <li class='nav-item'>
                                        <a class='nav-link' href='/my-lists'>My Lists</a>
                                    </li>
                                    <li class='nav-item'>
                                        <a class='nav-link' href='/explore'>Explore</a>
                                    </li>
                                    <li class='nav-item'>
                                        <a class='nav-link' href='#!' onClick={logout_user}>Logout</a>
                                    </li>
                                </>
                            )
                    }          
                </ul>
            </div>
        </nav>
        { redirect ? <Redirect to='/'/> : <></> }
        </>
    )
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});

export default connect(mapStateToProps, {logout})(Navbar);