import React, { useState } from 'react';


const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");

    return (        

        <div className="register-container">
            <form action="">
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