import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { checkAuthenticated , load_user } from '../actions/auth.js';
import { delete_list, load_list_owner } from '../actions/lists.js';

const ListDetail = (props) => {
    const [list, setList] = useState();
    const [listDeleted, setListDeleted] = useState(false)
    console.log(props.match.params.id)

    useEffect(() => {
        console.log('listdetailusereffect')
        const fetchData = async () => {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                    'Accept': 'application/json'
                }
            };
            try {
                const res = await axios.get(`${process.env.REACT_APP_DATABASE_URL}/api/lists/${props.match.params.id}/`, config);

                setList(res.data);
                console.log(res.data);
            } catch (err) {

            }
        }

        props.checkAuthenticated();
        fetchData();
    }, []);

    useEffect(()=>{
        if (list) {
            props.load_list_owner(list.list_author)
        }
    }, [list])

    const handleDelete = (list_id) => {
        props.delete_list(list_id);
        setListDeleted(true);
    }

    if (listDeleted) {
        return <Redirect to='/my-lists'/>
    }

    return ( 
        <div className='container mt-5'>
        { list && props.user && props.listOwner ?
            (
                <div class="row justify-content-center">
                     <h3>{list.list_title} by {props.listOwner.first_name} {props.listOwner.last_name} </h3>
                    <div class="col-12 mt-5">
                        <div class="list-group mt-5" id="list-tab" role="tablist">
                        <a class="list-group-item list-group-item-action active" id="list-home-list" data-toggle="list" href="#list-home" role="tab" aria-controls="home">{list.list_entry_1}</a>
                        <a class="list-group-item list-group-item-action" id="list-profile-list" data-toggle="list" href="#list-profile" role="tab" aria-controls="profile">{list.list_entry_2}</a>
                        <a class="list-group-item list-group-item-action" id="list-messages-list" data-toggle="list" href="#list-messages" role="tab" aria-controls="messages">{list.list_entry_3}</a>
                        </div>
                    </div>
                    <div class="col-12 mt-5 ml-1">
                        <div class="tab-content" id="nav-tabContent">
                        <div class="tab-pane fade show active" id="list-home" role="tabpanel" aria-labelledby="list-home-list">{list.list_entry_1_desc}</div>
                        <div class="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">{list.list_entry_2_desc}</div>
                        <div class="tab-pane fade" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list">{list.list_entry_3_desc}</div>
                        </div>
                    </div>
                    <div className='col-12 mt-4'>
                        <blockquote>
                        <footer class="blockquote-footer">published on {list.date.slice(0, 9)} <cite title="Source Title"></cite></footer>
                        </blockquote>
                    </div>
                    {

                        props.user.id == list.list_author ? (
                            <>
                            <div className="mt-5">
                                <button className="btn btn-danger mr-2" onClick={() => {handleDelete(list.id)}}>Delete List</button>
                                <Link to={'/list-edit/' + list.id}><button className="btn btn-primary ml-2">Edit List</button></Link>
                            </div>
                            </>
                        ) : null 
                    }
                </div>
            ):

            null
            
        }
         </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    listOwner: state.lists.listOwner
})


export default connect(mapStateToProps, {checkAuthenticated, delete_list, load_list_owner})(ListDetail);