import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  Axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:3000/auth/login', {
      email,
      password,
    }).then(response => {
      if(response.data.status){
        navigate('/')
      }
    }).catch(err => {
      console.error(err)
    })
  }

  return (
    <div className="flex justify-center items-center">
      <div className="border border-red-800 w-[28rem]">
        <h2>Login</h2>

        <form onSubmit={handleSubmit} className="flex flex-col mt-3">
 
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

          <button type="submit">Login</button>
          <Link to='/reset-pass'>Forgot password?</Link>
          <p>Don't have an account? <Link to='/signup'>Sign up</Link> </p>
        </form>
      </div>
    </div>
  );
}

export default Login