import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';

const ForgotPass = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate()

  Axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:3000/auth/reset-pass', {
      email,
    }).then(response => {
      if(response.data.status){
        alert('check email for reset link')
        navigate('/login')
      }
    }).catch(err => {
      console.error(err)
    })
  }

  return (
    <div className="flex justify-center items-center">
      <div className="border border-red-800 w-[28rem]">
        <h2>Forgot Password</h2>

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

          <button type="submit">Send</button>
          <Link to='/login'>Back to login</Link>
        </form>
      </div>
    </div>
  );
}

export default ForgotPass