import { useState } from 'react';
import {useGroupContext} from '../hooks/useGroupContext';

const GroupForm = () => {
    const {dispatch} = useGroupContext();
    const [groupName, setName] = useState('');
    const [groupId, setId] = useState('');
    const [error, setError] = useState('');
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        const group = { groupName, groupId };

        const res = await fetch('/api/groups', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
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
            setEmptyFields(null);
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
                className='{emptyFields.includes("groupName") ? "error" : ""}'
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