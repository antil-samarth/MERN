import { useState } from 'react';
import {useGroupContext} from '../hooks/useGroupContext';
import {useAuthContext} from '../hooks/useAuthContext';

const GroupForm = () => {
    const {dispatch} = useGroupContext();
    const [groupName, setName] = useState('');
    const [groupId, setId] = useState('');
    const [error, setError] = useState('');
    const [emptyFields, setEmptyFields] = useState([]);
    const {user} = useAuthContext();

    const handleSubmit = async(e) => {
        e.preventDefault();

        if(!user){
            setError('You must be logged in to create a group.');
            return;
        }

        const group = { groupName, groupId };

        const res = await fetch('https://mern-app-production-e81b.up.railway.app:4000/api/groups', {
            method: 'POST',
            headers: { 
                "Content-Type": "application/json",                
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(group)
        });
        const json = await res.json();
        
        if (!res.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields);
        }
        if (res.ok) {
            setName('');
            setId('');
            setError(null);
            setEmptyFields([]);
            console.log('new group added', json);
            dispatch({type: 'ADD_GROUP', payload: group});
        }
    }


    return(
        <form className='create' onSubmit={handleSubmit}>
            <h3>Create a new group</h3>
            
            <label>Group Name</label>
            <input
                type='text'
                onChange={(e) => setName(e.target.value)}
                value = {groupName}
                className={emptyFields.includes("groupName") ? "error" : ""}
            />
            <label>Group Id</label>
            <input
                type='number'
                onChange={(e) => setId(e.target.value)}
                value = {groupId}
                className='{emptyFields.includes("groupId") ? "error" : ""}'
            />
            <button>Add Group</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )

}

export default GroupForm;