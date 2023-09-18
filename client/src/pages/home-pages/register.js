import React, { useState } from 'react';
import axios from "axios";
// import dotenv from 'dotenv';
// dotenv.config({ path: '../../../.env' });
// require('dotenv').config({ path: '../../../.env' });



const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    
    const onSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const response = await axios.post(`http://localhost:3001/auth/register`, {
                username,
                password
            });
    
            if (response.status === 200) {
                alert("Registration successful");
            } else {
                alert("Registration failed. Please try again later.");
            }
        } catch (error) {
            alert(error);
        }
    };
    

    return (        

        <div className="register-container">
            <form onSubmit={onSubmit} action="">
                <h2>Register</h2>
                <div className="from-group">
                    <label htmlFor="username">Username: </label>
                    <input 
                        type="text" 
                        id="username" 
                        value={username}
                        onChange={(event)=> setUsername(event.target.value)}/>
                </div>
                <div className="from-group">
                    <label htmlFor="password">Password: </label>
                    <input 
                        type="text" 
                        id="password" 
                        value={password}
                        onChange={(event)=>setPassword(event.target.value)}/>
                </div>
                <div className="from-group">
                    <label htmlFor="rePassword">Rewrite password: </label>
                    <input 
                        type="text" 
                        id="rePassword" 
                        value={rePassword}
                        onChange={(event)=>setRePassword(event.target.value)}/>
                </div>
            <button type="submit">Register</button>
            </form>
        </div>
        
    );

};

export default Register;