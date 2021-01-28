import React from 'react';
import { UserContext } from '../../contexts/userContext';
import { Redirect } from 'react-router-dom';
import { LOGIN_PAGE } from '../../config/routes';
import AdminsListView from '../../components/Admin/AdminsListView';
import { getAdminsApi } from '../../api/services/getAdminsApi';
import { AdminsListContext } from '../../contexts/adminsListContext';

const AdminsListPage = () => {

    const [session, ] = React.useContext(UserContext);

    const render = () => {
        if(session && session.loading) {
            return null;
        }
        if(session && session.user && session.user.roles.some(role => role === "SUPER_ADMIN")) {
            return <AdminsListView />
        } 
        return <Redirect to={LOGIN_PAGE} />
    }

    return (
        render()
        );
}

export default AdminsListPage;