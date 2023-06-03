import { useAuthContext } from "./useAuthContext";
import {useGroupContext} from './useGroupContext';

export const useLogout = () => {

    const { dispatch } = useAuthContext();
    const { dispatch: dispatchGroup } = useGroupContext();

    const logout = () => {
        localStorage.removeItem('user');  
        
        dispatch({type: 'LOGOUT'});  
        dispatchGroup({type: 'SET_GROUPS', payload: null});      
    };

    return {
        logout
    };

};