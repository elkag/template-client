import React, { useState, createContext } from 'react';
import { validateApi } from '../api/services/validateTokenApi';

export const UserContext = createContext();

export const UserSessionProvider = (props) => {

    const [session, setSession] = useState({
        user: null, loading: true
    });

    React.useEffect(() => {
        async function fetchData() {
            const response = await validateApi.validate();
            if(!response.error) {
                setSession({user: response, loading: false});
            } else {
                setSession({user: null, loading: false});
            }
        }
        fetchData();
    }, []);
    
    return(
        <UserContext.Provider value={[session, setSession]}>
            {props.children}
        </UserContext.Provider>
    );
}