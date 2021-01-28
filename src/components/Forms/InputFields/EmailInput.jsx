import React from 'react';
// Components
import SimpleInput from './SimpleInput';

const EmailInputField = ({  id, value, onChange, disabled, onBlur, inputName, title, placeholder }) => {

    const [errorMsg, setErrorMsg] = React.useState('');

    /**
     * Check if email adrress is correct
     * 
     * @param {String} aValue //input field value
     */
    const onChangeInput = (aValue) => {

        if(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(aValue)) {
            setErrorMsg('');
            return onChange(aValue, false, '');
        } 
        setErrorMsg('Incorrect email');
        return onChange(aValue, true, 'Incorrect email');     
    }

    return (
            <SimpleInput 
                id={id} 
                value={value}
                disabled={disabled}
                type="text" 
                inputName={inputName} 
                title={title} 
                placeholder={placeholder} 
                onChange={onChangeInput}
                onBlur={onBlur}
                error={errorMsg}
                required={true}/>
    );
}

export default EmailInputField;