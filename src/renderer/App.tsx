import React from 'react';
// import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
// import SearchBar from './search_bar/search_bar';
import './App.global.css';
import TimeConverter from './plugins/time_converter/time_converter';


export default function App() {
  return (
    <div>
      <div id="drag" style={{height: "20px"}}></div>
      <TimeConverter time={0}/>
    </div>
  );
}
