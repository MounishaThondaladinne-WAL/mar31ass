import axios from "axios";
import React from "react";
import { useState } from "react";

export default function RegisterUser() {
  let [status, setStatus] = useState("");
  let [email, setEmail] = useState();
  let [username, setUsername] = useState();

  const checkUsername = () => {
    axios
      .get(`/reguser/checkusername/${username}`)
      .then((res) => {
        console.log(res.data.status);
        if (!res.data.status) {
          setStatus("Username already exist");
        } else {
          setStatus("");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const checkEmail = () => {
    axios
      .get(`/reguser/checkemail/${email}`)
      .then((res) => {
        console.log(res.data.status);
        if (!res.data.status) {
          setStatus("User Exists already");
        } else {
          setStatus("");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    let userObj = {
      email: event.target.email.value,
      username: event.target.username.value,
      password: event.target.value,
      dob: event.target.dob.value,
    };
    axios
      .post("/reguser", userObj)
      .then((res) => {
        if (!res.data.status) {
          setStatus(res.data.debug_data);
        } else {
          setStatus("");
          console.log(" User Registered successfully");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1> Registration </h1>
      <h4 className='msg-check'> {status}</h4>
      <form onSubmit={handleSubmit}>
        <br />
        <input
          type='text'
          name='username'
          placeholder='username'
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          required
        />

        <button onClick={checkUsername} className='btn'>
          Check UserName
        </button>

        <br />
        <input
          type='email'
          name='email'
          placeholder='email'
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          required
        />
        <button onClick={checkEmail} className='btn'>
          Check Email
        </button>
        <br />

        <input
          type='password'
          name='password'
          placeholder='password'
          required
        />
        <br />

        <b>Choose Date of Birth</b>
        <br />
        <input type='date' name='dob' required />

        <br />
        <button className='btn'>Register</button>
      </form>
    </div>
  );
}
