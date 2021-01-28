import React from 'react';
// config
import { ABOUT_PAGE } from '../../config/routes';
// context
import { UserContext } from '../../contexts/userContext';
// API
import { loginApi } from '../../api/services/loginApi';
//components
import LoginForm from '../../components/Forms/LoginForm/LoginForm';
import { makeStyles } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { bgColor } from '../../styles/colors';
import { validateApi } from '../../api/services/validateTokenApi';
import { oauthLoginApi } from '../../api/services/oauthLoginApi';
import ChangePasswordForm from '../../components/Forms/LoginForm/ChangePasswordForm';
import { changePasswordApi } from '../../api/services/changePasswordApi';

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
  
  error: {
    width: '100%',
    textAlign: 'center',
    color: red[600],
    fontSize: "small" 
  }
}));

const ChangePasswordPage = (props) => {
  
    // User session
    const [, setSession] = React.useContext(UserContext);
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const classes = useStyles(makeStyles);
    // Sends requested data to BE
    // Log user if success
    // Saves user's session in a cookie and context
    const changePassword = async (password, newPassword, rePassword) => {
        setLoading(true);
        setError(false);
        
        const response = await changePasswordApi.change(password, newPassword, rePassword);
        
        if(response.error) {
          setError(response.message);
          setLoading(false);
        } else {
          validate();
        }
      }

    const validate = async() => {
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
      <div className={classes.pageWrapper}>
        <ChangePasswordForm 
          onSubmit={changePassword} 
          isLoading={loading} 
          error={error}/>
      </div>
    )
}

export default ChangePasswordPage;