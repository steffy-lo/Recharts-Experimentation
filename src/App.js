import React, {useState, useEffect} from "react";
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area } from 'recharts';
import './App.css';
import {getUsageData} from "./actions";

function App() {

  const [data, setData] = useState([]);
  useEffect(() => {
    getUsageData()
        .then(data => {
            console.log(data);
            let cleanData = data.filter(d => !d.Tag.includes("unmatched") && !d.Tag.includes('omitted'));
            cleanData.forEach(d => d.Percentage = Math.ceil(d.Percentage));
            setData(cleanData);
        })
  }, []);

  return (
    <div className="App" style={{ marginTop: '5%' }}>
        <AreaChart style={{ margin: 'auto' }}
                   width={1500} height={550} data={data}
                   margin={{ top: 10, right: 30, left: 30 }}>
            <XAxis dataKey="Tag" />
            <YAxis />
            <CartesianGrid strokeDasharray="1 1" />
            <Tooltip />
            <Area type="monotone" dataKey="Percentage" stroke="#8884d8" fillOpacity={1} fill="#8884d8" />
        </AreaChart>
    </div>
  );
}

export default App;
