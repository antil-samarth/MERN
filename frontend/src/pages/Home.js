import { useEffect } from "react"
import {useGroupContext} from '../hooks/useGroupContext';

// components
import GroupDetails from "../components/GroupDetails"
import GroupFrom from "../components/GroupForm"

const Home = () => {
  const {groups, dispatch} = useGroupContext();

  useEffect(() => {
    const fetchgroups = async () => {
      const response = await fetch('/api/groups')
      const json = await response.json()

      if (response.ok) {
        console.log(json);
        dispatch({type: 'SET_GROUPS', payload: json.groups})
      }
    }

    fetchgroups()
  }, [dispatch])

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