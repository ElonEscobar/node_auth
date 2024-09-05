import React, { useState } from "react";
import Axios from "axios"
import { Link, useNavigate } from "react-router-dom";


const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:3000/auth/signup', {
      username,
      email,
      password,
    }).then(response => {
      if(response.data.status){
        navigate('/login')
      }
    }).catch(err => {
      console.error(err)
    })
  }

  return (
    <div className="flex justify-center items-center">
      <div className="border border-red-800 w-[28rem]">
        <h2>Sign Up</h2>

        <form onSubmit={handleSubmit} className="flex flex-col mt-3">
          <div>
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              placeholder="email"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              placeholder="****"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit">Sign Up</button>
          <p>I have an account <Link to='/login'>Login</Link> </p>

        </form>
      </div>
    </div>
  );
};

export default Signup;
