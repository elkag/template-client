import React from 'react';
import { UserContext } from '../../contexts/userContext';
import { Redirect } from 'react-router-dom';
import { LOGIN_PAGE } from '../../config/routes';
import ReviewItemView from '../../components/Admin/ReviewItemView';

const ViewItemPage = ({item, page}) => {

    const [session, ] = React.useContext(UserContext);

    

    const render = () => {
        if(session && session.loading) {
            return null;
        }
        if(session && session.user && session.user.roles.some(role => role === "AUTHOR")) {
            return <ReviewItemView item={item} page={page}/>
        } 
        return <Redirect to={LOGIN_PAGE} />
}

return (
    render()
    );
}

export default ViewItemPage;