import {useGroupContext} from '../hooks/useGroupContext';
import { useAuthContext } from '../hooks/useAuthContext';

import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const GroupDetails = ({ group }) => {
    const { dispatch } = useGroupContext();
    const { user } = useAuthContext();
    const handleClick = async () => {
        
        if (!user) {
            console.log('You must be logged in to delete a group.');
            return;
        }

        const res = await fetch('https://mern-app-production-e81b.up.railway.app:4000/api/groups/' + group._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });
        const data = await res.json();
        console.log(data.group);

        if (res.ok) {
            console.log('group deleted');
            dispatch({ type: 'DELETE_GROUP', payload: data.group })
        }
    }

    return (
        <div className="group-details">
            <h2>{group.groupName}</h2>
            <p>{group.groupId}</p>
            <p>{((group.createdAt) ? formatDistanceToNow(new Date(group.createdAt), { addSuffix: true}): null)
            /*()=>{if (group.createdAt) {formatDistanceToNow(new Date(group.createdAt), { addSuffix: true})}}*/}</p>
            <span className='material-symbols-outlined' onClick={handleClick}>delete</span>
        </div>
    )
}

export default GroupDetails;