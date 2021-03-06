import React from 'react';
import { UserContext } from '../../contexts/userContext';
import { Redirect } from 'react-router-dom';
import { LOGIN_PAGE } from '../../config/routes';
import EditItemView from './EditItemPage';

const AddItemPage = () => {

    const [session, ] = React.useContext(UserContext);    

    const render = () => {
        if(session && session.loading) {
            return null;
        }
        if(session && session.user) {
            return <EditItemView />
        } 
        return <Redirect to={LOGIN_PAGE} />
}

return (
    render()
    );
}

export default AddItemPage;