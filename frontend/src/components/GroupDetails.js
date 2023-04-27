import {useGroupContext} from '../hooks/useGroupContext';

import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const GroupDetails = ({ group }) => {
    const { dispatch } = useGroupContext();

    const handleClick = async () => {
        const res = await fetch('/api/groups/' + group._id, {
            method: 'DELETE'
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
            <p>{formatDistanceToNow(new Date(group.createdAt), { addSuffix: true})}</p>
            <span className='material-symbols-outlined' onClick={handleClick}>delete</span>
        </div>
    )
}

export default GroupDetails;