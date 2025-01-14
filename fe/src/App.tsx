import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Script from 'react-load-script';
import { getAllUsersViaCsv } from './api/Users';

declare global {
  interface Window {
      gapi: any;
      google: any;
  }
}

function App() {
  const [gapiInited, setGapiInited] = useState(false);
  const [gisInited, setGisInited] = useState(false);
  const [tokenClient, setTokenClient] = useState<any>();
  const [tokenResponse, setTokenResponse] = useState<any>();
  const [data, setData] = useState<any[]>([]);

  const onGapiLoaded = () => {
    window.gapi.load('client', initializeGapiClient);
  }

  const initializeGapiClient = async () => {
    await window.gapi.client.init({
      apiKey: process.env.REACT_APP_GOOGEL_API_KEY,
      discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
    });
    setGapiInited(true);
  }

  const onGisLoaded = () => {
    setTokenClient(window.google.accounts.oauth2.initTokenClient({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      scope: "https://www.googleapis.com/auth/spreadsheets",
      callback: '', // defined later
    }));
    setGisInited(true);
  }

  const onChartsApiLoaded = () => {
    window.google.charts.load('current', {packages: ['corechart']});
    window.google.charts.setOnLoadCallback(() => {
      console.log(window.google.visualization.Query);
    });
  };

  const authorize = () => {
    tokenClient.callback = async (resp: any) => {
      if (resp.error !== undefined) {
        throw (resp);
      }
      setTokenResponse(resp);
    };

    if (window.gapi.client.getToken() === null) {
      // Prompt the user to select a Google Account and ask for consent to share their data
      // when establishing a new session.
      tokenClient.requestAccessToken({prompt: 'consent'});
    } else {
      // Skip display of account chooser and consent dialog for an existing session.
      tokenClient.requestAccessToken({prompt: ''});
    }
  }

  const getData = () => {
    // getAllUsers().then((res) => {
    //    console.log(res)
    // });
    getAllUsersViaCsv().then((res) => setData(res as any));
  }

  const signOut = () => {
    const token = window.gapi.client.getToken();
    if (token !== null) {
      window.google.accounts.oauth2.revoke(token.access_token);
      window.gapi.client.setToken('');
      setTokenResponse(null);
    }
  }

  return (
      <div className="App">
        <Script url="https://apis.google.com/js/api.js" onLoad={onGapiLoaded}></Script>
        <Script url="https://accounts.google.com/gsi/client" onLoad={onGisLoaded}></Script>
        {/* https://developers.google.com/chart/interactive/support */}
        <Script url="https://www.gstatic.com/charts/loader.js" onLoad={onChartsApiLoaded}></Script>
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
            Learn React PORT= {process.env.REACT_APP_PORT}, Google id={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          </a>
          { gapiInited && gisInited && (
            <div>
              <button onClick={authorize}>{ tokenResponse ? "Refresh" : "Authorize" }</button>
              {tokenResponse && <button onClick={signOut}>Sign out</button>}
              {tokenResponse && <button onClick={getData}>Get data</button>}
              {[...data?.map((val, idx) => <div key={idx}>{val.Email}</div>)]}
            </div>
          )}
        </header>
    </div>
  );
}

export default App;
