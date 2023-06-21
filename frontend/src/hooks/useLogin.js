import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch('https://mern-app-production-e81b.up.railway.app/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        
        });
        const data = await response.json();

        if(!response.ok) {
            setError(data.error);
            setIsLoading(false);
            return;
        }
        if(response.ok) {
            setIsLoading(false);

            localStorage.setItem('user', JSON.stringify(data));

            dispatch({type: 'LOGIN', payload: data});
            
            setIsLoading(false);
        }
    }

    return {
        login,
        isLoading,
        error
    };

}