import React from 'react';
// Components
import SimpleInput from './SimpleInput';

const UsernameInput = ({  id, value, onChange, disabled, onBlur, error, inputName, title, placeholder }) => {

    const [errorMsg, setErrorMsg] = React.useState('');
    /**
     * Username validation
     * 
     * @param {String} aValue //username value
     */
    const onChangeInput = (aValue) => {
        setErrorMsg('');
        let error = '';
        if(aValue === '') {
            
            error = `* ${title} is required`;
        }
        
        setErrorMsg(error);
        return onChange(aValue, error !== '', error);        
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
                error={errorMsg || error}
                required={true}/>
    );
}

export default UsernameInput;