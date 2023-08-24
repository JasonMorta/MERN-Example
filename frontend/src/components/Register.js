import React, { useState } from 'react';

export default function Register(props) {


  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(""); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // REGISTER USER
      await fetch("/register", {
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
          if (data[0] !== "!OK") {
            props.handleLogIn(data)
          } else {
            setError(data[1])
          }
          console.log(data)
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
    <div className="box-container">
      <div className="box-container-inner">
        <h1>Register</h1>
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
                <button type="submit">Register</button>
                <p>{error}</p>
         </form>
        </div>
      </div>
    </div>
  );
}
