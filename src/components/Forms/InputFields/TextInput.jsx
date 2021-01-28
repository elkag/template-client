import React from 'react';
// Components
import SimpleInput from './SimpleInput';

const TextInput = ({    id, 
                        value,
                        disabled,
                        type,
                        onChange,
                        onBlur,
                        inputName,
                        title,
                        placeholder,
                        compare,
                        testid
                        }) => {

    const [errorMsg, setErrorMsg] = React.useState('');

    /**
     * Checks if the email address is correct
     * 
     * @param {String} aValue //input field value
     */
    const onChangeInput = (aValue) => {
        let error = '';
        if(aValue !== '') {
            if(compare && compare !== '' && aValue !== compare) {
                error = '* Password doesn\'t match';
            }
        } else {
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
                type={type} 
                inputName={inputName} 
                title={title} 
                placeholder={placeholder} 
                onChange={onChangeInput}
                onBlur={onBlur}
                error={errorMsg}
                required={true}
                testid={testid}/>
    );
}

export default TextInput;