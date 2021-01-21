import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import axios from 'axios';

const Login = ({ login, isAuthenticated, error }) => {
    const [formData, setFormData] = useState({
        'email': '',
        'password':''
    });

    const { email, password } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});
    const onSubmit = e => {
        e.preventDefault();

        login(email, password) //function from actions
    }; 

    const continueWithGoogle = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_DATABASE_URL}/auth/o/google-oauth2/?redirect_uri=https://top-three.herokuapp.com`);

            window.location.replace(res.data.authorization_url);
            
        } catch (err) {

        }
    };

    if (isAuthenticated) {
        return <Redirect to='/'/>
    }

    return (
        <div className='container mt-5'>
            {
                error && (error == "Could not log in. Please check credentials and try again." || error == "An account already exists with this email. Please Log in." || "You've successfully created an account! Please check your email to activate your account to log in.") ? (
                    <div class="alert alert-warning alert-dismissible fade show" role="alert">
                        <strong>Authentication: </strong> {error}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                ): null
            }
            <h1>Sign In</h1>
            <p>Sign in to your account</p>
            <form onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='email'
                        placeholder='email'
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='password'
                        name='password'
                        value={password}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <button className='btn btn-primary' type='submit'>Login</button>
            </form>
            <button className='btn btn-danger mt-3' onClick={continueWithGoogle}>Continue With Google</button>
            <p className='mt-3'>
                Don't have an account? <Link to='/signup'>Sign Up.</Link>
            </p>
            <p className='mt-3'>
                Forgot your Password? <Link to='/password-reset'>Reset Password.</Link>
            </p>
        </div>
    )
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.notification
})

export default connect(mapStateToProps, {login})(Login);