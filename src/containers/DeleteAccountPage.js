import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { delete_user } from '../actions/auth';

const DeleteAccountPage = ({isAuthenticated, delete_user}) => {
    const [password, setPassword] = useState('');
    const [accountDeleted, setAccountDeleted] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(password)
        delete_user(password);
        setAccountDeleted(true)

    }

    if (!isAuthenticated && accountDeleted) {
        return <Redirect to='/'/>
    }

    return (
        <div className='container mt-5'>
            { isAuthenticated && accountDeleted ? (
                 <div class="alert alert-warning alert-dismissible fade show mb-5" role="alert">
                        <strong>Authentication Error: </strong> Password not recognized.
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
            ) : null }
            <h1>Delete Your Account</h1>
            <p>Enter your password below to delete your account. Your lists will be deleted as well.</p>
            <form className='form-group' onSubmit={(e) => onSubmit(e)}>
                <input 
                    className='form-control'
                    type='password'
                    placeholder='Password'
                    name='password'
                    value={password}
                    onChange={(e) => {setPassword(e.target.value)}}
                    required
                />
                <button className='btn btn-danger mt-3' onClick={(e) => onSubmit(e)} type='submit'>Delete Account</button>
            </form>

        </div>
    )

}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {delete_user})(DeleteAccountPage);
