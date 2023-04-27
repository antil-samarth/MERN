import {createContext, useReducer} from 'react';

export const GroupContext = createContext();

export const groupReducer = (state, action) => {
    switch(action.type) {
        case 'ADD_GROUP':
            return {
                ...state,
                groups: [action.payload, ...state.groups, action.payload]
            }
        case 'SET_GROUPS':
            return {
                groups: action.payload
            }
        case 'DELETE_GROUP':
            return {
                groups: state.groups.filter(group => group._id !== action.payload._id)
            }
        default:
            return state;    
    }

}

export const GroupContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(groupReducer, {groups: null});

    //dispatch({type: 'ADD_GROUP', payload: {groupName: 'test', groupId: 1}}); 
    
    return(
        <GroupContext.Provider value={{...state, dispatch}}>
            { children }
        </GroupContext.Provider>
    )
}