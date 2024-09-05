import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Axios from "axios";

const PassReset = () => {
  const [password, setPassword] = useState("");
  const {token} = useParams()

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3000/auth/set-password/"+token, {
      password,
    })
      .then((response) => {
        if (response.data.status) {
          navigate("/login");
        }
        console.log(response.data)
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="flex justify-center items-center">
      <div className="border border-red-800 w-[28rem]">
        <h2>Set New Password</h2>

        <form onSubmit={handleSubmit} className="flex flex-col mt-3">
          <div>
            <label htmlFor="password">New Password: </label>
            <input
              type="password"
              placeholder="****"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit">Reset password</button>
        </form>
      </div>
    </div>
  );
};

export default PassReset;
