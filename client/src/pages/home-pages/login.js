import React, { useState } from 'react';


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (        

        <div className="login-container">
            <form action="">
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