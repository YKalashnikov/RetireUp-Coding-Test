import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard'
import db from './data/db.json'

function App() {
  return (
    <React.Fragment>
      <Dashboard data={db}/>
    </React.Fragment>
  );
}

export default App;
