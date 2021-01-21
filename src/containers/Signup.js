import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../actions/auth';
import axios from 'axios';

const Signup = ({ signup, isAuthenticated, error }) => {
    const [passwordErrors, setPasswordErrors] = useState([]);
    const [accountCreated, setAccountCreated] = useState(false);
    const [formData, setFormData] = useState({
        'first_name': '',
        'last_name':'',
        'email': '',
        'password':'',
        're_password':''
    });

    const { first_name, last_name, email, password, re_password } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});
    const onSubmit = e => {
        e.preventDefault();
        if (password !== re_password || password.length < 7) {
            setPasswordErrors(prevState => ([...prevState, 'Please check your passwords. They must match and be over 6 characters.']))
        } else {
            console.log('signingup..')
            signup(first_name, last_name, email, password, re_password) 

            if (!error) {
                setAccountCreated(true);
            }
        };
    } 

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
    
    if (accountCreated) {
        return <Redirect to='/login'/>
    }

    return (
        <div className='container mt-5'>
            {
                passwordErrors.map(err => (
                    <div class="alert alert-warning alert-dismissible fade show" role="alert">
                        <strong>Account Creation Error: </strong> {err}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true" class="text-danger">&times;</span>
                        </button>
                    </div>
                ))

               
            }
            {error && error == "An account already exists with this email. Please Log in." ? (
                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>Account Creation Error: </strong> {error}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>                 
            ) : null}

            <h1>Sign Up</h1>
            <p>Create Your Account</p>
            <form onSubmit={e => {onSubmit(e)}}>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='First Name'
                        name='first_name'
                        value={first_name}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>        
                 <div className='form-group'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Last Name'
                        name='last_name'
                        value={last_name}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>               
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='email'
                        placeholder='Email*'
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
                        placeholder='Password*'
                        name='password'
                        value={password}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Confirm password*'
                        name='re_password'
                        value={re_password}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <button className='btn btn-primary' type='submit'>Sign Up</button>
            </form>
            <button className='btn btn-danger mt-3' onClick={continueWithGoogle}>Continue With Google</button>
            <p className='mt-3'>
                Already have an account? <Link to='/login'>Signup</Link>
            </p>
        </div>
    )
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.notification
})

export default connect(mapStateToProps, {signup})(Signup);