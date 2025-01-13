import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Script from 'react-load-script';
import { getAllUsers } from './api/Users';

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
  const [data, setData] = useState<{id: string, email: string}[]>([]);
  /**
       * Callback after api.js is loaded.
       */
  const onGapiLoaded = () => {
    // gapi.load('client', initializeGapiClient);
    window.gapi.load('client', initializeGapiClient);
  }

  /**
   * Callback after the API client is loaded. Loads the
   * discovery doc to initialize the API.
   */
  const initializeGapiClient = async () => {
    await window.gapi.client.init({
      apiKey: process.env.REACT_APP_GOOGEL_API_KEY,
      discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
    });
    setGapiInited(true);
  }

  // /**
  //  * Callback after Google Identity Services are loaded.
  //  */
  const onGisLoaded = () => {
    setTokenClient(window.google.accounts.oauth2.initTokenClient({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      scope: "https://www.googleapis.com/auth/spreadsheets",
      callback: '', // defined later
    }));
    setGisInited(true);
  }

  // /**
  //  *  Sign in the user upon button click.
  //  */
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
    getAllUsers().then((res) => {
      setData(res);
    });
  }

  // /**
  //  *  Sign out the user upon button click.
  //  */
  const signOut = () => {
    const token = window.gapi.client.getToken();
    if (token !== null) {
      window.google.accounts.oauth2.revoke(token.access_token);
      window.gapi.client.setToken('');
      setTokenResponse(null);
    }
  }

  // /**
  //  * Print the names and majors of students in a sample spreadsheet:
  //  * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
  //  */
  // async function listMajors() {
  //   let response;
  //   try {
  //     // Fetch first 10 files
  //     response = await gapi.client.sheets.spreadsheets.values.get({
  //       spreadsheetId: '15DS3prlfbOpvgGXAKMJq-bZjyxBbqF1y7qrki6mVQB4',
  //       range: 'USERS!A:B',
  //     });
  //   } catch (err) {
  //     document.getElementById('content').innerText = err.message;
  //     return;
  //   }
  //   const range = response.result;
  //   if (!range || !range.values || range.values.length == 0) {
  //     document.getElementById('content').innerText = 'No values found.';
  //     return;
  //   }
  //   // Flatten to string to display
  //   const output = range.values.reduce(
  //       (str, row) => `${str}${row[0]}, ${row[1]}\n`,
  //       '');
  //   document.getElementById('content').innerText = output;
  // }

  return (
      <div className="App">
        <Script url="https://apis.google.com/js/api.js" onLoad={onGapiLoaded}></Script>
        <Script url="https://accounts.google.com/gsi/client" onLoad={onGisLoaded}></Script>
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
              {[...data?.map((val, idx) => <div key={idx}>{val.email}</div>)]}
            </div>
          )}
        </header>
    </div>
  );
}

export default App;
