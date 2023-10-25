/* eslint-disable react/prop-types */
import { useState } from 'react';

const ManagedInput = ({
    id,
    type,
    name,
    value,
    setValue,
    errorMessage,
    validateField,
}) => {
    const [isValid, setValid] = useState(true);
    const f = (e) => {
        setValue(e.target.value);
        setValid(validateField(e.target.value));
    };
    return (
        <div className="input-wrapper">
            <label htmlFor={id}>{name}</label>
            <input
                type={type ?? 'text'}
                className="text-control"
                id={id}
                required
                name={name}
                onChange={(e) => f(e)}
                value={value}
            />
            {!isValid ? (
                <div style={{ color: 'red', fontSize: '10px' }}>
                    {errorMessage}
                </div>
            ) : (
                ''
            )}
        </div>
    );
};

export default ManagedInput;