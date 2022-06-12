import React from 'react';

const InputFile = ({ setData, groupBy, setGroupBy }) => {
    const groupByLabelEN = "Origin";

    const getGroupByValues = (value) => {
        var a = groupBy;
        const newVal = value.replace("\r", "");
        if (groupBy.indexOf(newVal) === -1 && newVal !== '') {
            a.push(newVal);
        }
        setGroupBy(a)

    }

    const handleFileInput = (e) => {
        let input = e.target;
        let reader = new FileReader();
        reader.onload = function () {
            let result = [];
            let lines = reader.result.split(/\r?\n|\r/);
            console.log("lines:", lines)
            let headers = lines[0].split("\t");
            for (var i = 1; i < lines.length; i++) {
                let obj = {};
                let currentline = lines[i].split("\t");
                let findNA = false;
                for (let j = 0; j < headers.length; j++) {
                    if (currentline[j] === "NA") {
                        findNA = true;
                    }

                    if (headers[j] === "Herkunft") headers[j] = groupByLabelEN
                    if (isNaN(parseFloat(currentline[j]))) {
                        obj[headers[j]] = currentline[j].replace("\r", "");
                    } else {
                        obj[headers[j]] = parseFloat(currentline[j]);
                    }
                    if (headers[j] === groupByLabelEN) {
                        getGroupByValues(currentline[j])
                    }

                }
                if (!findNA) {
                    result.push(obj);
                }

            }
            setData(result)
        };
        reader.readAsText(input.files[0]);
    }

    return (
        <div >
            <h2>Upload File</h2>
            <input type="file" name="data" onChange={(e) => handleFileInput(e)} />
        </div>
    );
};

export default InputFile;