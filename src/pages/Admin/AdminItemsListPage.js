import React from 'react';
import { UserContext } from '../../contexts/userContext';
import { Redirect } from 'react-router-dom';
import { LOGIN_PAGE } from '../../config/routes';
import ReviewItemsListView from '../../components/Admin/ReviewItemsListView';

const AdminItemsListPage = () => {

    const [session, ] = React.useContext(UserContext);

    const render = () => {
        if(session && session.loading) {
            return null;
        }
        if(session && session.user && session.user.roles.some(role => role === "SUPER_ADMIN")) {
            return <ReviewItemsListView />
        } 
        return <Redirect to={LOGIN_PAGE} />
    }

    return (
        render()
        );
}

export default AdminItemsListPage;