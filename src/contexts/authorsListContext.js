import React, { useState, createContext } from 'react';

export const AuthorsListContext = createContext();

export const AuthorsListContextProvider = (props) => {

    const [authors, setAuthors] = useState([]);

    return(
        <AuthorsListContext.Provider value={[authors, setAuthors]}>
            {props.children}
        </AuthorsListContext.Provider>
    );
}