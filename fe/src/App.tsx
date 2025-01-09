import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
// import { getTestData } from './api/test';
import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from './contexts/AuthContext';
import Test from './components/Test';

function App() {

  const [user, setUser] = useState<any>();
  const [credentialResponse, setCredentialResponse] = useState<CredentialResponse | undefined>();

  useEffect(() => {
    if (!user && credentialResponse?.credential) {
      setUser(jwtDecode(credentialResponse.credential));
      console.log(user);
    }
  }, [credentialResponse, user]);

  const errorMessage = () => {
      console.log("error");
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}>
      <AuthContext.Provider value={{ credentialResponse, user }}>
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
          {credentialResponse ? (
            <Test></Test>
            ) : (
            <GoogleLogin onSuccess={setCredentialResponse} onError={errorMessage} useOneTap />
            )}
        </header>
    </div>
    </AuthContext.Provider>
    </GoogleOAuthProvider>
  );
}

export default App;
