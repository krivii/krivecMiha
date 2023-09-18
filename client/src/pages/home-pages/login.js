import React, { useState } from 'react';
import axios from "axios";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [_, setCookies] = useCookies(["access_token"]);

    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const response = await axios.post(`http://localhost:3001/auth/login`, {
                username,
                password
            });
        setCookies("access_token", response.data.token);
        window.localStorage.setItem("userID", response.data.userID);
        navigate("/");
        } catch (error) {
            alert(error);
        }
    };

    return (        

        <div className="login-container">
            <form onSubmit={onSubmit} action="">
                <h2>Sign in</h2>
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
            <button type="submit">Sign in</button>
            </form>
        </div>
        
    );

};

export default Login;