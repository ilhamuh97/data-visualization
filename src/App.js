import './App.css';
import { useState } from 'react';
import InputFile from './components/InputFile/InputFile';
import Main from './components/Main/Main';

function App() {
  const [data, setData] = useState(null);
  const [groupBy, setGroupBy] = useState([]);
  return (
    <div className="App">
      <h1>
        Data Visualization
      </h1>
      <InputFile setData={setData} groupBy={groupBy} setGroupBy={setGroupBy} />
      <Main data={data} groupBy={groupBy} />
    </div>
  );
}

export default App;
