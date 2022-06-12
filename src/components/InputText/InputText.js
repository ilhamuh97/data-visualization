import React from 'react';

const InputText = ({ label, onChange, name }) => {
    return (
        <div>
            <label htmlFor={name}>
                {label}
            </label>
            <input id={name} type="text" name={name} onChange={(e) => onChange(e.target.value)} />
        </div>
    );
};

export default InputText;