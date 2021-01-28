import React from 'react';
import SimpleInput from './SimpleInput';
import { PASSWORD } from './constants';

const PasswordInput = (
    id, 
    value,
    onChange,
    onBlur,
    inputName,
    title,
    placeholder
) => {

    const [errorMsg, setErrorMsg] = React.useState('');

    const onChangeInput = (aValue) => {
        setErrorMsg('');
        return onChange(PASSWORD, aValue, false, '');
    }

    return (
        <SimpleInput 
                id={id} 
                value={value}
                type="password" 
                inputName={inputName} 
                title={title} 
                placeholder={placeholder} 
                onChange={onChangeInput}
                onBlur={onBlur}
                error={errorMsg}
                requered={true}/>
    )
}

export default PasswordInput;