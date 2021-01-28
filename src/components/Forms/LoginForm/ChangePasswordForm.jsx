import React from 'react';

//styles
import FormLayout from '../FormLayout/FormLayout';
import TextInput from '../InputFields/TextInput';
import StyledButton from '../../common/StyledButton';
import { makeStyles } from '@material-ui/core';
import { textsRed, mainGreen } from '../../../styles/colors';

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
const ChangePasswordForm = ({onSubmit, isLoading, error}) => {

    const classes = useStyles(makeStyles);
    // Credentials data
     // User session
    const [password, setPassword] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");
    const [rePassword, setRePassword] = React.useState("");
    
    // set password
     const onChangeOldPassword = (value, error) => {
        setPassword(value);
    }

    // set password
    const onChangeNewPassword = (value, error) => {
        setNewPassword(value);
    }

    // set password
    const onChangeRePassword = (value, error) => {
        setRePassword(value);
    }

    const checkData = () => {
       return true;
    }

    const onSubmitLogin = () => {
        if(checkData()) {
            onSubmit(password, newPassword, rePassword)
        }
    }

    return (
            <FormLayout>
                <div className={classes.titleRow}>
                    <div className={classes.title}>Change password</div>
                </div>
                <TextInput 
                    testid='login-pass'
                    id="old_password" 
                    disabled={isLoading}
                    type="password"
                    value={password}
                    inputName="password" 
                    title="Old Password" 
                    placeholder="Old password.."
                    onChange={ onChangeOldPassword } />
                 <TextInput 
                    testid='login-pass'
                    id="password" 
                    disabled={isLoading}
                    type="password"
                    value={newPassword}
                    inputName="password" 
                    title="New Password" 
                    placeholder="New password.."
                    onChange={ onChangeNewPassword } />
                <TextInput 
                    testid='login-pass'
                    id="password" 
                    disabled={isLoading}
                    type="password"
                    value={rePassword}
                    inputName="password" 
                    title="Repeate password" 
                    placeholder="Repeate your new password.."
                    onChange={ onChangeRePassword } />
                <div data-testid='login-error' className={classes.error}>{error}</div>
                <div className={classes.loginButtonWrapper}>
                    <StyledButton
                        onClick={onSubmitLogin}
                        disabled={isLoading || password === "" || newPassword === "" || rePassword === ""}
                        >
                        Submit
                    </StyledButton>
                </div>
            </FormLayout>
    )
}

export default ChangePasswordForm;