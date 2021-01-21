import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { checkAuthenticated , load_user } from '../actions/auth.js';

const UserLists = ({ checkAuthenticated, load_user, isAuthenticated, user }) => {
    const [lists, setLists] = useState([]);
    const [selectedUserList, setSelectedUserList] = useState({})

    useEffect(() => {
        console.log('INSIDE USEREFFECT')
        const fetchData = async () => {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                    'Accept': 'application/json'
                }
            };
            try {
                const res = await axios.get(`${process.env.REACT_APP_DATABASE_URL}/api/lists/user/${user.id}/`, config);

                setLists(res.data);
                console.log(res.data);
            } catch (err) {

            }
        }

        checkAuthenticated();
        fetchData();
    }, [user]);

    return ( 
        <div className='container mt-4 mx-auto'>
            <h1>Your Lists</h1>
           <ul class='list-group list-group-flush w-50 p-3'>
                {lists.map(list => (
                    <a href={'/list-detail/' + list.id} className='list-group-item list-group-item-action'>{list.list_title}</a>
                ))}
            </ul>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})


export default connect(mapStateToProps, {checkAuthenticated, load_user})(UserLists);