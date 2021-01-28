import React from 'react';

//styles
import FormLayout from '../FormLayout/FormLayout';
import TextInput from '../InputFields/TextInput';
import StyledButton from '../../common/StyledButton';
import FacebookButton from '../../common/FacebookButton';
import { makeStyles, Divider, Button } from '@material-ui/core';
import { textsRed, mainGreen } from '../../../styles/colors';
import { REGISTER_PAGE } from '../../../config/routes';
import { FacebookProvider, LoginButton, Like, Profile } from 'react-facebook';
import googleLogo from '../../../resources/img/google-logo.png';
import GoogleButton from '../../common/GoogleButton';

const useStyles = makeStyles((theme) => ({
    titleRow: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingBottom: 20
    },
    title: {
        fontWeight: 'bold'
    },
    error: {
        height:'auto',
        color: textsRed,
        fontSize: 'small',
        paddingTop: '5px'
    },
    infoText: {
        width: '100%',
        textAlign: 'center',
        paddingTop: '20px',
        justifyContent: 'center',
        fontWeight: 'bold'
    },
    link: {
        color: mainGreen,
        textAlign: 'center',
        textDecoration: "none",
        "&:hover": {
            textDecoration: "underline",
            textAlign: 'center'
        },
        "&.active": {
            color: "blue",
            textDecoration: "none",
        }
    },
    bottom: {
        paddingTop: 10,
    },
    btnFacebook: {
        background: '#4267b2',
        color: 'white',
        verticalAlign: 'middle',
        textAlign: 'center',
        border: 0,
        borderRadius: '4px',
      
    },
    fbText: {
        marginRight: 8
    },
    hidden: {
        padding: 0,
        margin: 0,
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: 'rgba(0,0,0,0)'
    },
    logoImage: {
        margin: '8px 8px 8px 12px',
        width: 24,
        height: 24
    },
    divider: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingBottom: 10
    },
    loginButtonWrapper: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: 20
    },
    socialButtonsWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'

    }
}));
const LoginForm = ({onSubmit, onFacebookLogin, onFacebookLoginError, onGoogleLogin, isLoading, error}) => {

    const classes = useStyles(makeStyles);
    // Credentials data
     // User session
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    
    // set username
    const onChangeUsername = (value, error) => {
        setEmail(value);
    }

    // set password
     const onChangePassword = (value, error) => {
        setPassword(value);
    }

    const checkData = () => {
       return true;
    }

    const onSubmitLogin = () => {
        if(checkData()) {
            onSubmit(email, password)
        }
    }

    return (
            <FormLayout>
                <div className={classes.titleRow}>
                    <div className={classes.title}>Sign in</div>
                    <div><a className={classes.link} href={REGISTER_PAGE}>or create an account</a></div>
                </div>
                <TextInput 
                    testid='login_uname'
                    id="username" 
                    disabled={isLoading}
                    type="text"
                    value={email}
                    inputName="username" 
                    title="Username" 
                    placeholder="Your email.."
                    onChange={ onChangeUsername } />
                <TextInput 
                    testid='login-pass'
                    id="password" 
                    disabled={isLoading}
                    type="password"
                    value={password}
                    inputName="password" 
                    title="Password" 
                    placeholder="Your password.."
                    onChange={ onChangePassword } />
                <div data-testid='login-error' className={classes.error}>{error}</div>
                <div className={classes.loginButtonWrapper}>
                    <StyledButton
                        onClick={onSubmitLogin}
                        disabled={isLoading || email === "" || password === ""}
                        >
                        Login
                    </StyledButton>
                </div>
                <div className={classes.bottom}>
                    <div className={classes.divider}>
                        <div style={{width: '40%'}}><Divider/></div>
                        <div>or</div>
                        <div style={{width: '40%'}}><Divider/></div>
                    </div>
                    
                    <div className={classes.socialButtonsWrapper}>
                        <FacebookProvider appId="3310247495689135">
                            <LoginButton
                                className={classes.hidden}
                                scope="email"
                                onCompleted={onFacebookLogin}
                                onError={onFacebookLoginError}
                            >
                                <FacebookButton>
                                    <img className={classes.logoImage} src="https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/sKRYKszttLX.png" alt=""/>
                                    <div className={classes.fbText}>Login with Facebook</div>
                                </FacebookButton>
                            </LoginButton>
                        </FacebookProvider>
                        &nbsp;
                        <GoogleButton>
                            <img className={classes.logoImage} src={googleLogo} alt="Google" /> 
                            <div className={classes.fbText}>Login with Google</div>
                        </GoogleButton>
                    </div>
                </div>
            </FormLayout>
    )
}

export default LoginForm;