import React, {useEffect, useState, useContext} from 'react';
import logo from './logo.svg';
import './App.css';
import { Chart } from './Chart'
import Tabs from './Tabs'

import { StoreContext }  from './StoreProvider'
import TableauFrame from './TableauFrame'
import TableauFrame2 from './TableauFrame2'

function App() {
  const store = useContext(StoreContext)
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p> */}
        {/* <Chart></Chart> */}
        <Tabs></Tabs>

          <div style={{ width: '80vw'}}>
       {/* <TableauFrame></TableauFrame> */}
       {/* <TableauFrame2></TableauFrame2> */}
       </div>
 

        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  );
}

export default App;
