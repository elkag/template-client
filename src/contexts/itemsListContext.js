import React, { useState, createContext } from 'react';

export const ItemsListContext = createContext();

export const ItemsListContextProvider = (props) => {

    const [rows, setRows] = useState([]);

    return(
        <ItemsListContext.Provider value={[rows, setRows]}>
            {props.children}
        </ItemsListContext.Provider>
    );
}