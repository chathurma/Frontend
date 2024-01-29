import React, { useState } from 'react';
import { useAuth } from '../utils/Auth';
import userData from '../data/users.json';
import Swal from 'sweetalert2'


import axios from 'axios';

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();

  const validateEmail = () => {
    if (!email) {
      setEmailError('Email is required');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError('Password is required');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    validateEmail();
    validatePassword();

    if (!emailError && !passwordError) {
      try {
       
        const sampleUser = userData.find(user => user.email === email);
        if (sampleUser) {
          if (sampleUser.password === password) {
            login(sampleUser);
            localStorage.setItem('user', JSON.stringify(sampleUser));
            setError('');
            Swal.fire({
              title: 'Login Success',
              text: 'Welcome to the website',
              icon: 'success',
              confirmButtonText: 'OK'
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = '/';
              }
            }
            )


          } else {
            setError('Invalid email or password');
          }
        } else {
          setError('Invalid email or password');
        }

        
      } catch (error) {
        setError('Invalid email or password');
      }
    
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
      <div className="w-50 bg-info p-4" style={{ filter: "drop-shadow(2px 4px 6px black)" }}>
        <form onSubmit={handleSubmit}>
          <div className="header">
            <h1 className="text-center">Login</h1>
          </div>
          <div className="form-group mb-2">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail();
              }}
            />
            {emailError && <p className="error-message">{emailError}</p>}
          </div>
          <div className="form-group mb-4">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validatePassword();
              }}
            />
            {passwordError && <p className="error-message">{passwordError}</p>}
          </div>

          <button type="submit" className="btn btn-primary w-50 p-2" style={{ margin: "0% 25%" }}>Submit</button>
        </form>
        {error && <p className="error-message mt-3">{error}</p>}
      </div>
    </div>
  );
}
