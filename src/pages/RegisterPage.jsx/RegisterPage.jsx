import React from 'react';
// Configuration
import { HOME_PAGE, ABOUT_PAGE } from '../../config/routes';
import { setSessionCookie } from '../../config/session';
import { UserContext } from '../../contexts/userContext';

// API
import { registerApi } from '../../api/services/registerApi';
import { loginApi } from '../../api/services/loginApi';

// Components
import RegisterForm from '../../components/Forms/RegisterForm/RegisterForm';
import { makeStyles } from '@material-ui/core';
import { bgColor } from '../../styles/colors';
import { validateApi } from '../../api/services/validateTokenApi';

const useStyles = makeStyles(theme => ({
    pageWrapper: {
        width: '100%',
        height: 'calc(100vh - 90px)',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "center",
        backgroundColor: bgColor
    },
  }));
  

const RegisterPage = (props) => {

    const classes = useStyles(makeStyles);
    // Session context
    const [, setSession] = React.useContext(UserContext);
    const [loading, setLoading] = React.useState(false);

    // if there is some error from the server side
    const [error, setError] = React.useState( true );

    /**
     * Sends requested data to BE
     */
    const onSubmit = async (
        email, 
        password, 
        firstName, 
        lastName, 
        repeatPassword
    ) => {
        setLoading(true);
        const response = await registerApi.register(
            {
                email, 
                password, 
                firstName, 
                lastName, 
                repeatPassword
            }
        );
        if(response.error || response.errors) {
            setLoading(false);
            setError(response.message)
        } else {
            validateToken();
        }
    };

    const validateToken = async() => {
        const validateResponse = await validateApi.validate();
        setLoading(false);
        if(validateResponse.error){
          setError(validateResponse.errorMessage)
        } else{
          setSession( {user: validateResponse} );
          props.history.push(ABOUT_PAGE);
        }
      }

    return (
        <div className={classes.pageWrapper} >
            <RegisterForm error={error} isLoading={loading} onSubmit={onSubmit} />
        </div>
    )
}

export default RegisterPage;