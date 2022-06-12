import React from 'react';

const SelectElement = ({ values, label, name, onChange }) => {

    return (
        <div className="x-axis">
            <label htmlFor={name}>
                {label}
            </label>
            <select id={name} name={name} onChange={(e) => onChange(e.target.value)}>
                <option hidden> -- select an option -- </option>
                {
                    values.map((k) => {
                        return (
                            <option key={k}>
                                {k}
                            </option>
                        )
                    })
                }
            </select>
        </div>
    );
};

export default SelectElement;