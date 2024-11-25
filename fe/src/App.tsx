import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { getTestData } from './api/test';

function App() {

  const [data, setData] = useState<{title: string}[]>();

  useEffect(() => {
    getTestData().then((res) => setData(res.data));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React PORT= {process.env.REACT_APP_PORT}, API_PATH={process.env.REACT_APP_API_PATH}
        </a>
        Data = {data && data[0] && data[0].title}
      </header>
    </div>
  );
}

export default App;
