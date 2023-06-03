import { useEffect } from "react"
import {useGroupContext} from '../hooks/useGroupContext';
import {useAuthContext} from '../hooks/useAuthContext';

// components
import GroupDetails from "../components/GroupDetails"
import GroupFrom from "../components/GroupForm"

const Home = () => {
  const {groups, dispatch} = useGroupContext();
  const {user} = useAuthContext();

  useEffect(() => {
    const fetchgroups = async () => {
      const response = await fetch('/api/groups', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok) {
        console.log(json);
        dispatch({type: 'SET_GROUPS', payload: json.groups})
      }
    }

    if (user) {
      fetchgroups();
    }
  }, [dispatch, user])

  return (
    <div className="home">
      <div className="groups">
        {groups && groups.map((group) => (
          <GroupDetails group={group} key={group._id} />
        ))}
      </div>
      <GroupFrom />
    </div>
  )
}

export default Home