import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField } from '@mui/material';

import './login.css';

const Login = () => {
    // React States
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [userData, setUserData] = useState({});
    const [uname, setUname] = useState('');
    const [pass, setPass] = useState('');

    const errors = {
        uname: 'invalid username',
        pass: 'invalid password',
    };

    const handleSubmit = (event) => {
        //Prevent page reload
        event.preventDefault();

        axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/login`, {
                user_name: uname,
                user_pass: pass,
            })
            .then((res) => {
                if (res.data.length === 0) {
                    alert(
                        `Invalid credentials. Try again with correct username or SignUp with new user.`
                    );
                    setErrorMessages({ name: 'pass', message: errors.pass });
                } else {
                    console.log('hi uid userr: ', res.data);
                    setUserData(res.data[0]);
                    localStorage.setItem (
                        'profile',
                        JSON.stringify ({...res.data[0]})
                      );
                    window.location = `${process.env.REACT_APP_FRONTEND_URL}/products`;
                }
            })
            .catch((err) => {
                console.log(err);
            });
            
    };

    // Generate JSX code for error message
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );

    // JSX code for login form
    const renderForm = (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    {/* <label>Username </label>
                    <input type="text" name="uname" required />
                    {renderErrorMessage('uname')} */}

                    <TextField
                        type="text"
                        placeholder="User Name"
                        fullWidth
                        name="username"
                        variant="outlined"
                        value={uname}
                        onChange={(event) => setUname(event.target.value)}
                        required
                        autoFocus
                    />
                </div>
                <div className="input-container">
                    {/* <label>Password </label>
                    <input type="password" name="pass" required />
                    {renderErrorMessage('pass')} */}
                    <TextField
                        type={'password'}
                        placeholder="Password"
                        fullWidth
                        name="password"
                        variant="outlined"
                        value={pass}
                        onChange={(event) => setPass(event.target.value)}
                        required
                    />
                </div>
                <div className="button-container">
                    <input type="submit" />
                </div>
            </form>
        </div>
    );

    return (
        <div className="app">
            <div className="login-form">
                <div className="title">Sign In</div>
                {isSubmitted ? (
                    <div>User is successfully logged in</div>
                ) : (
                    renderForm
                )}
            </div>
        </div>
    );
};

export default Login;
