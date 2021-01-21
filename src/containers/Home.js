import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import axios from 'axios';

const Home = ({isAuthenticated, user, login}) => {

    console.log(process.env.REACT_APP_API_URL);
    const sampleLogin = () => {
        login("topthreesampleuser@gmail.com", "testpass123");
    }

    return (
        <div>
            <div class='jumbotron mt-5'>
                <h1 class='display-4'>TopThree</h1>
                <p class='lead mt-4'>What's your top 3?</p>
                <hr class='my-4'/>
                { !isAuthenticated ?
                    (
                        <>
                            <Link to='/login' class='lead'>
                                <a class="btn btn-primary btn-lg" href='/login' role='button'>Log In</a>
                            </Link>
                            <div className='mt-4'>
                            <button className='btn btn-info' onClick={() => {sampleLogin()}}>Sample User Log In</button>
                            </div>
                        </>
                    )
                    :
                        null
                }
            </div>
        </div>
    )
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})

export default connect(mapStateToProps, {login})(Home);