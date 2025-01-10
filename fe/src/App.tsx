import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  let gapi: any;
  /**
       * Callback after api.js is loaded.
       */
  function onGapiLoaded() {
    console.log(gapi);
    // gapi.load('client', initializeGapiClient);
    gapi.load('client', () => {
      console.log(gapi.client);
    });
  }

  /**
   * Callback after the API client is loaded. Loads the
   * discovery doc to initialize the API.
   */
  // async function initializeGapiClient() {
  //   await gapi.client.init({
  //     apiKey: API_KEY,
  //     discoveryDocs: [DISCOVERY_DOC],
  //   });
  //   gapiInited = true;
  //   maybeEnableButtons();
  // }

  // /**
  //  * Callback after Google Identity Services are loaded.
  //  */
  // function gisLoaded() {
  //   tokenClient = google.accounts.oauth2.initTokenClient({
  //     client_id: CLIENT_ID,
  //     scope: SCOPES,
  //     callback: '', // defined later
  //   });
  //   gisInited = true;
  //   maybeEnableButtons();
  // }

  // /**
  //  * Enables user interaction after all libraries are loaded.
  //  */
  // function maybeEnableButtons() {
  //   if (gapiInited && gisInited) {
  //     document.getElementById('authorize_button').style.visibility = 'visible';
  //   }
  // }

  // /**
  //  *  Sign in the user upon button click.
  //  */
  // function handleAuthClick() {
  //   tokenClient.callback = async (resp) => {
  //     if (resp.error !== undefined) {
  //       throw (resp);
  //     }
  //     document.getElementById('signout_button').style.visibility = 'visible';
  //     document.getElementById('authorize_button').innerText = 'Refresh';
  //     await listMajors();
  //   };

  //   if (gapi.client.getToken() === null) {
  //     // Prompt the user to select a Google Account and ask for consent to share their data
  //     // when establishing a new session.
  //     tokenClient.requestAccessToken({prompt: 'consent'});
  //   } else {
  //     // Skip display of account chooser and consent dialog for an existing session.
  //     tokenClient.requestAccessToken({prompt: ''});
  //   }
  // }

  // /**
  //  *  Sign out the user upon button click.
  //  */
  // function handleSignoutClick() {
  //   const token = gapi.client.getToken();
  //   if (token !== null) {
  //     google.accounts.oauth2.revoke(token.access_token);
  //     gapi.client.setToken('');
  //     document.getElementById('content').innerText = '';
  //     document.getElementById('authorize_button').innerText = 'Authorize';
  //     document.getElementById('signout_button').style.visibility = 'hidden';
  //   }
  // }

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
        <script type="text/javascript" src="https://apis.google.com/js/api.js" onLoad={onGapiLoaded}></script>
        {/* <script async defer src="https://accounts.google.com/gsi/client" onLoad={onGsiLoaded}></script> */}
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
        </header>
    </div>
  );
}

export default App;
