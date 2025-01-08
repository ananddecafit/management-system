import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { getTestData } from './api/test';
import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

function App() {

  const [, setData] = useState<{title: string}[]>();
  const [session, setSession] = useState<CredentialResponse>();

  const errorMessage = () => {
      console.log("error");
  };

  useEffect(() => {
    getTestData().then((res) => setData(res.data)).catch((err) => console.log(err));
  }, []);

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}>
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
            Learn React PORT= {process.env.REACT_APP_PORT}, Google id={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          </a>
          {session ? (
            <div>Login success</div>
            ) : (
            <GoogleLogin onSuccess={setSession} onError={errorMessage} useOneTap />
            )}
        </header>
    </div>
    </GoogleOAuthProvider>
  );
}

export default App;
