import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { create_list } from '../actions/lists';
import { checkAuthenticated, load_user } from '../actions/auth';
import { update_list } from '../actions/lists';
import env from 'react-dotenv';
import axios from 'axios';

const EditListPage = (props) => {
    const [formData, setFormData] = useState({
        'list_title':'',
        'list_entry_1': '',
        'list_entry_1_desc': '',
        'list_entry_2': '',
        'list_entry_2_desc': '',
        'list_entry_3': '',
        'list_entry_3_desc': ''
    })
    const [list, setList] = useState();
    const [listUpdated, setListUpdated] = useState(false);

    const { 
        list_title, 
        list_entry_1, 
        list_entry_1_desc,
        list_entry_2,
        list_entry_2_desc,
        list_entry_3,
        list_entry_3_desc } = formData

    useEffect(() => {
        const fetchData = async () => {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                    'Accept': 'application/json'
                }
            }

            try {
                const res = await axios.get(`${env.DATABASE_URL}/api/lists/${props.match.params.id}/`, config);
                console.log(res.data);
                setList(res.data);
                setFormData({
                    'list_title': res.data.list_title,
                    'list_entry_1': res.data.list_entry_1,
                    'list_entry_1_desc': res.data.list_entry_1_desc,
                    'list_entry_2': res.data.list_entry_2,
                    'list_entry_2_desc': res.data.list_entry_2_desc, 
                    'list_entry_3': res.data.list_entry_3,
                    'list_entry_3_desc': res.data.list_entry_3_desc
                })
            } catch (err) {

            }
        }
        props.checkAuthenticated();
        props.load_user();
        fetchData();
        if (!props.isAuthenticated) {
            return <Redirect to='/login'/>
        }
        }, [])

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});
    
    const onSubmit = e => {
        e.preventDefault();

        const list_author = props.user.id
        props.update_list(list.id, list_title, list_entry_1, list_entry_1_desc, list_entry_2,
            list_entry_2_desc, list_entry_3, list_entry_3_desc, list_author);

        setListUpdated(true);
    }

    if (listUpdated) {
        console.log()
        return <Redirect to={'/my-lists'}/>
    }

    return (
        <div className='container mt-5'>
        { list && props.user ? (
        <>
            <h1>Edit Your List!</h1>
            <form onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='List Title*'
                        name='list_title'
                        value={list_title}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-row'>
                    <div className='form-group col-md-6'>
                        <input
                            className='form-control'
                            type='text'
                            placeholder='Enter Your First Choice*'
                            name='list_entry_1'
                            value={list_entry_1}
                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                        <div className='form-group col-md-6'>
                        <textarea
                            className='form-control'
                            type='text'
                            placeholder='Description 1'
                            name='list_entry_1_desc'
                            value={list_entry_1_desc}
                            onChange={e => onChange(e)}
                          
                        />
                    </div>
                 </div>
                 <div className='form-row'>
                    <div className='form-group col-md-6'>
                        <input
                            className='form-control'
                            type='text'
                            placeholder='Enter Your Second Choice*'
                            name='list_entry_2'
                            value={list_entry_2}
                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                        <div className='form-group col-md-6'>
                        <textarea
                            className='form-control'
                            type='text'
                            placeholder='Description 2'
                            name='list_entry_2_desc'
                            value={list_entry_2_desc}
                            onChange={e => onChange(e)}
                          
                        />
                    </div>
                </div>
                          <div className='form-row'>
                    <div className='form-group col-md-6'>
                        <input
                            className='form-control'
                            type='text'
                            placeholder='Enter Your Third Choice*'
                            name='list_entry_3'
                            value={list_entry_3}
                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                        <div className='form-group col-md-6'>
                        <textarea
                            className='form-control'
                            type='text'
                            placeholder='Description 3'
                            name='list_entry_3_desc'
                            value={list_entry_3_desc}
                            onChange={e => onChange(e)}
                    
                        />
                    </div>
                </div>

                <button className='btn btn-primary' type='submit'>Edit List</button>
            </form>
        </>
        ): null}
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});

export default connect(mapStateToProps, {checkAuthenticated, load_user, create_list, update_list})(EditListPage);