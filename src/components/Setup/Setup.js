import React, { useEffect, useState } from 'react';
import SelectElement from '../SelectElement/SelectElement';
import Checkboxes from '../Checkboxes/Checkboxes';
import InputText from '../InputText/InputText';

const Setup = ({ data, setSetupData, groupBy }) => {
    const [xAxis, setXAxis] = useState("");
    const [yAxis, setYAxis] = useState("");
    const [color, setColorAxis] = useState("");
    const [filterText, setFilterText] = useState("");
    const [groupByChecked, setGroupByChecked] = useState("");

    useEffect(() => {
        const obj = {
            xAxis: xAxis,
            yAxis: yAxis,
            color: color,
            groupBy: groupByChecked,
            filterText: filterText
        }
        setSetupData(obj)
        console.log(obj)
    }, [xAxis, yAxis, setSetupData, groupByChecked, color, filterText]);

    const getKeyTypeNumber = (d) => {
        const keys = Object.keys(d)
        const result = [];
        keys.forEach(key => {
            if (typeof (d[key]) !== 'string') {
                result.push(key)
            }
        });
        return result
    }
    getKeyTypeNumber(data[0]);
    return (
        <div>
            <h2>
                Setup Data
            </h2>
            <div>
                <div className="x-axis-wrapper">
                    <Checkboxes
                        values={groupBy}
                        label="Only Show: "
                        onChange={setGroupByChecked}
                        groupByChecked={groupByChecked}
                    />
                </div>
                <div className="x-axis-wrapper">
                    <SelectElement
                        values={getKeyTypeNumber(data[0])}
                        label="X-Coordinate: "
                        name="x-axis"
                        onChange={setXAxis}
                    />
                </div>
                <div className="y-axis-wrapper">
                    <SelectElement
                        values={getKeyTypeNumber(data[0])}
                        label="Y-Coordinate: "
                        name="y-axis"
                        onChange={setYAxis}
                    />
                </div>
                <div className="radius-axis-wrapper">
                    <SelectElement
                        values={getKeyTypeNumber(data[0])}
                        label="Color Scale: "
                        name="r-axis"
                        onChange={setColorAxis}
                    />
                </div>
                <div className="filter-text-wrapper">
                    <InputText
                        label="Search by Text, use comma for multiple values: "
                        name="filter_text"
                        onChange={setFilterText}
                    />
                </div>
            </div>
        </div>
    );
};

export default Setup;