import React, { useState } from 'react';
import ScatterPlot from '../ScatterPlot/ScatterPlot';
import Setup from '../Setup/Setup';

const Main = ({ data, groupBy }) => {
    const [setupData, setSetupData] = useState({});

    const dimensions = {
        width: 800,
        height: 400,
        margin: { top: 30, right: 30, bottom: 30, left: 60 }
    };

    return (
        <div>
            {
                data ? (
                    <>
                        <Setup data={data} setSetupData={setSetupData} groupBy={groupBy} />
                        <div className='data-visualization-wrapper'>
                            <h2 className='data-visualization-title'>Data Visualization</h2>
                            <ScatterPlot data={data} setupData={setupData} dimensions={dimensions} groupBy={groupBy} />
                        </div>
                    </>
                ) : (
                    <div>Please upload a file first</div>
                )
            }
        </div>
    );
};

export default Main;