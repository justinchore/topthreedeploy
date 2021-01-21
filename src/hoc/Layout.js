import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { connect } from 'react-redux';
import { checkAuthenticated, load_user, googleAuthenticate } from '../actions/auth';
import queryString from 'query-string';

const Layout = (props) => {
    let location = useLocation();

    useEffect(() => {
        const values = queryString.parse(location.search);
        const state = values.state ? values.state : null;
        const code = values.code ? values.code : null;

        console.log('State: ' + state);
        console.log('Code: ' + code);

        if (state && code) {
            props.googleAuthenticate(state, code)
        } else {
           props.checkAuthenticated();
           props.load_user();
        }
    }, [location]);
  
  
    return(  
        <div>
            <Navbar/>
            {props.children}
            <footer class="footer">
                <div class="container">
                    <span class="text-muted"> by <a href="https://www.linkedin.com/in/justin-cho-2500891ba/">Justin Cho</a> | <a href="https://github.com/justinchore/topthreedeploy">Github</a></span>
                </div>
            </footer>
        </div>
  )
};

const mapStateToProps = state => ({
    user: state.auth.user
})

export default connect(mapStateToProps, {checkAuthenticated, load_user, googleAuthenticate})(Layout);