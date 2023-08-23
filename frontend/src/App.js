import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import { useState } from 'react';
import UserData from './components/UserData';

function App() {

  const [showLogIn, setShowLogIn] = useState("loggedOut");
  const [userDoc, setUserDoc] = useState("")


  function handleLogIn(userData) {
    setUserDoc(userData)
    setShowLogIn("loggedIn");
  }



  return (
    <div className="App">

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="App-link">
          To-do React App!
        </p>

        <div className='btn-container'>
          <button onClick={() => setShowLogIn("true")}>Log in</button>
          <button onClick={() => setShowLogIn("false")}>Register</button>
        </div>

      </header>

      <div className='inputEls'>
        {showLogIn === "true" ?
          <Login handleLogIn={handleLogIn} />
          : 
          showLogIn === "false" ?
          <Register handleLogIn={handleLogIn} /> 
          :
          showLogIn === "loggedOut" ?
          <h1>Welcome</h1> 
          :
          showLogIn === "loggedIn" ? 
          <UserData passData={userDoc} /> 
          : 
          null

        }
      </div>

    </div>
  );
}

export default App;
