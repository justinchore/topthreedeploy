import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { verify } from '../actions/auth';


const Activate = ({ match ,verify }) => {
    const [verified, setVerified] = useState(false);

    const verify_account = (e) => {
        const uid = match.params.uid;
        const token = match.params.token;

        verify(uid, token); 
        setVerified(true);//function from actions
    } 

    if (verified) {
        return <Redirect to='/'/>
    }

    return (
        <div className='container mt-5'>
           <div className='d-flex flex-column justify-content-center align-items-center'
           style={{ marginTop: '200px'}}>
               <h1>Verify your Account:</h1>
               <button
                onClick={verify_account}
                style={{ marginTop: "50px"}}
                type='button'
                className='btn btn-primary'
               >
                   Verify
               </button>
           </div>
        </div>
    )
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {verify})(Activate);