import React from 'react';

const Checkboxes = ({ values, label, onChange, groupByChecked }) => {

    const handleChange = (e, i) => {
        const newCheckedState = groupByChecked.split("\t");
        console.log("checkbox before: ", newCheckedState)
        const index = newCheckedState.indexOf(e.target.value);

        if (e.target.checked) {
            if (groupByChecked) {
                newCheckedState.push(e.target.value);
            } else {
                newCheckedState[0] = e.target.value;
            }
        } else {
            newCheckedState.splice(index, 1);
        }
        onChange(newCheckedState.join("\t"));
        console.log("checkbox after: ", newCheckedState)
    }
    return (
        <div>
            <span>{label}</span>
            <div>
                {
                    values.map((v, i) => {
                        return (
                            <div key={v}>
                                <label htmlFor={`${v}-${i}`}>
                                    {v}
                                    <input
                                        id={`${v}-${i}`}
                                        type="checkbox"
                                        name={`${v}-${i}`}
                                        value={v}
                                        onChange={(e) => handleChange(e, i)}
                                    />
                                </label>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Checkboxes;