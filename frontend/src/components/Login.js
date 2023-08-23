import React, { useState } from 'react'
import "./style.css"

export default function Login(props) {


  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // LOGIN USER
      await fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: user.username,
            email: user.email,
            password: user.password
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          //use data here
          props.handleLogIn(data)
          console.log("login",data)
        })
        .catch((error) => console.error(error));
    
  };


    // handle input changes
    const handleInputs = (e, currentInput) => {
      setUser((prevUser) => ({
        ...prevUser, //spread in the previous state
        [currentInput.toLowerCase()]: e.target.value, // update the current input value in state
      }));
    };



  return (

    <container class="box-container">
      <div class="box-container-inner">
        <h1>Log in</h1>
        <div className='inputs'>

        <form onSubmit={handleSubmit}> 
        <input
                type="text"
                value={user.username}
                onChange={(e) => handleInputs(e, 'username')}
                placeholder="Username"
                required
              />
              <input
                type="email"
                value={user.email}
                onChange={(e) => handleInputs(e, 'email')}
                placeholder="Email"
                required
              />
              <input
                type="password"
                value={user.password}
                onChange={(e) => handleInputs(e, 'password')}
                placeholder="Password"
                required
              />
        <button type="submit">Log in</button>
          </form>
        </div>
        
      </div>
    </container>
  )
}
