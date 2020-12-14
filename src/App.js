import React, {useState, useEffect, useRef, useLayoutEffect} from "react";
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area, Bar, BarChart, Pie, PieChart, Legend, Cell} from 'recharts';
import './App.css';
import {getUsageData} from "./actions";
import { Paper, Tabs, Tab } from '@material-ui/core';
import { TabPanel } from "@material-ui/lab";
import TabContext from '@material-ui/lab/TabContext';
import SankeyDiagram from "./components/sankey";

function App() {
  const [data, setData] = useState([]);
  const [value, setValue] = React.useState("0");
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#FD3A4A', '#AF6E4D', '#BFAFB2'];

  const handleChange = (event, newValue) => {
      setValue(newValue);
  };

  useEffect(() => {
    getUsageData()
        .then(data => {
            let cleanData = data.filter(d => !d.Tag.includes("unmatched") && !d.Tag.includes('omitted'));
            cleanData.forEach(d => d.Percentage = Math.ceil(d.Percentage));
            setData(cleanData);
        })
  }, []);

  return (
    <div className="App">
        <TabContext value={value}>
        <Paper style={{ marginBottom: '5%' }}>
            <Tabs
                value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
                centered
            >
                <Tab label="Area Chart" value="0"/>
                <Tab label="Bar Chart" value="1"/>
                <Tab label="Pie Chart" value="2"/>
                <Tab label="Sankey Chart" value="3"/>
            </Tabs>
        </Paper>
        <TabPanel value="0">
            <AreaChart style={{ margin: 'auto' }}
                       width={1500} height={550} data={data}
                       margin={{ top: 10, right: 30, left: 30 }}>
                <XAxis dataKey="Tag" />
                <YAxis />
                <CartesianGrid strokeDasharray="1 1" />
                <Tooltip />
                <Area type="monotone" dataKey="Percentage" stroke="#0088FE" fillOpacity={1} fill="#0088FE"/>
            </AreaChart>
        </TabPanel>
        <TabPanel value="1">
            <BarChart style={{ margin: 'auto' }}
                      width={1500} height={550} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Tag" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Percentage">
                    {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Bar>
            </BarChart>
        </TabPanel>
        <TabPanel value="2">
            <PieChart style={{ margin: 'auto' }} width={550} height={550}>
                <Legend/>
                <Pie data={data} dataKey="Percentage" nameKey="Tag" label legend>
                    {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip/>
            </PieChart>
        </TabPanel>
        <TabPanel value="3">
            <SankeyDiagram data={data}/>
        </TabPanel>
        </TabContext>
    </div>
  );
}

export default App;
