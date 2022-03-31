import axios from "axios";
import React from "react";
import { useState } from "react";

export default function Register() {
  let [status, setStatus] = useState("");
  let [email, setEmail] = useState();
  let [username, setUsername] = useState();

  const checkUsername = () => {
    axios
      .get(`/user/checkusername/${username}`)
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
      .get(`/user/checkemail/${email}`)
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
      .post("/user", userObj)
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
      <h1> User Registration </h1>
      <h4 className="msg-check"> {status}</h4>
      <form onSubmit={handleSubmit}>
        <b>Enter UserName</b>
        <br />
        <input
          type="text"
          name="username"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          required
        />

        <button onClick={checkUsername} className="btn1">
          Check UserName
        </button>

        <b>Enter Email</b>
        <br />
        <input
          type="email"
          name="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          required
        />
        <button onClick={checkEmail} className="btn1">
          Check Email
        </button>

        <input type="password" name="password" required />
        <br />

        <b>Choose Date of Birth</b>
        <br />
        <input type="date" name="dob" required />

        <br />
        <button className="btn1">Register</button>
      </form>
    </div>
  );
}
