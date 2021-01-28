import React from 'react';

//Styles
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'stretch',
        alignItems: 'left',
        minWidth: '240px',
        width: '100%',
        paddingTop: 15
    },
    label: {
        paddingBottom: 10,
        fontSize: 12,
        fontWeight: "bold"
    },
    inputWrapper: {
        color: '#234465',
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: 'small',
        display: 'flex',
        height: '45px',
    },
    input: {
        width: '100%'
    },
    inputErrorWrapper: {
        display: 'flex',
    },
    error: {
        textAlign: 'left',
        color: 'red',
        fontSize: 12,
        height: 'auto'
    }
}));

const SimpleInput = ({
                        id, 
                        type, 
                        disabled,
                        onChange,
                        onBlur,
                        inputName,
                        title,
                        placeholder,
                        error, 
                        testid}) => {

    const classes = useStyles(makeStyles);

    const onChangeInput = (event) => {
        return onChange(event.target.value);
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.inputErrorWrapper}>
                <div className={classes.label}>
                    <label htmlFor={id}>{title}:</label>
                </div>
           </div>
           <div className={classes.inputWrapper}>
               <input className={classes.input} type={type} 
                       id={id} 
                       name={inputName} 
                       placeholder={placeholder} 
                       onChange={onChangeInput}
                       onBlur={onBlur}
                       disabled={disabled}
                       data-testid={testid} />
           </div>
           <div className={classes.error}>
                <label htmlFor={id}>{error}</label>
            </div>
           
       </div> )
}

export default SimpleInput;