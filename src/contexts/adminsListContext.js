import React, { useState, createContext } from 'react';

export const AdminsListContext = createContext();

export const AdminsListContextProvider = (props) => {

    const [admins, setAdmins] = useState([]);

    return(
        <AdminsListContext.Provider value={[admins, setAdmins]}>
            {props.children}
        </AdminsListContext.Provider>
    );
}