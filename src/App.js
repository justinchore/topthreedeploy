import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Activate from './containers/Activate';
import ResetPassword from './containers/ResetPassword';
import ResetPasswordConfirm from './containers/ResetPasswordConfirm';
import CreateList from './containers/CreateList';
import UserLists from './containers/UserLists';
import ListDetail from './containers/ListDetail';
import EditListPage from './containers/EditListPage';
import Explore from './containers/Explore';
import DeleteAccountPage from './containers/DeleteAccountPage';

import { Provider } from 'react-redux';
import store from './store';

import Layout from './hoc/Layout';
const App = () => (
    <Provider store={store}>
        <Router>
            <Layout>
                <Switch>
                    <Route exact path='/' component={Home}></Route>
                    <Route exact path='/login' component={Login}></Route>
                    <Route exact path='/signup' component={Signup}></Route>
                    <Route exact path='/activate/:uid/:token' component={Activate}></Route>
                    <Route exact path='/password-reset' component={ResetPassword}></Route>
                    <Route exact path='/password/reset/confirm/:uid/:token' component={ResetPasswordConfirm}></Route>
                    <Route exact path='/create-list' component={CreateList}></Route>
                    <Route exact path='/my-lists' component={UserLists}></Route>
                    <Route exact path='/list-detail/:id' component={ListDetail}></Route>
                    <Route exact path='/list-edit/:id' component={EditListPage}></Route>
                    <Route exact path='/explore' component={Explore}></Route>
                </Switch>
            </Layout>
        </Router>
    </Provider>
);

export default App;

// 'PASSWORD_RESET_CONFIRM_URL': 'password/reset/confirm/{uid}/{token}',
//     'USERNAME_RESET_CONFIRM_URL': 'email/reset/confirm/{uid}/{token}',
//     'ACTIVATION_URL': 'activate/{uid}/{token}',