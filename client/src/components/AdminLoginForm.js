//Spletna aplikacija za fotografe/ Web application for photographers

//Copyright (C) 2023  Luka Krivec (lk2378@student.uni-lj.si). Licensed under the GPL-3.0 or later.

import React, { useRef, useState } from 'react';

import styled from "styled-components";
import { motion } from "framer-motion";
import { fadeAnim, photoFromAboveAnim,  } from "../animation";
import { useLoginAdmin } from '../hooks/useLoginAdmin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const LoginForm = () => {

  const form = useRef();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [key, setKey] = useState("");
  const {loginAdmin, error, isLoading} = useLoginAdmin();



    const handleLogin = async (event) => {
      event.preventDefault();
      await loginAdmin(email, password, "admin", key); 
    }
  

    
  return (

    <StyledBase>
      <StyledForm ref={form} onSubmit={handleLogin}>
        <motion.h2 >
          Admin login
        </motion.h2>
        <motion.div variants={photoFromAboveAnim}>
          
            <label>Email</label>
            <input type="email" 
                   id="email" 
                   value={email}
                   onChange={(event)=> setEmail(event.target.value)} />             
            <label>Password</label>
            <input type="password" 
                   id="password" 
                   value={password}
                   onChange={(event)=> setPassword(event.target.value)} />    
            <label>Security key</label>
            <input type="password" 
                   id="key" 
                   value={key}
                   onChange={(event)=> setKey(event.target.value)} />    
          <motion.button disabled={isLoading} variants={fadeAnim} type="submit" value="login">
            Log in
          </motion.button>
          {error && <div
                        className='error'
                        style={{
                        border: '1px solid #ff6666',
                        height: '40px',
                        borderRadius: '5px',
                        color: '#ff6666',
                        display: 'flex',
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        }}
                        >{error}
                        </div>
           }
        </motion.div>
      </StyledForm>
      <ToastContainer/>
    </StyledBase>
  );
};

export default LoginForm;



export const StyledImage = styled.div`
    flex: 1;
    overflow: hidden; 
    z-index: 2;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const StyledForm = styled.form`
  flex: 1;
  padding-right: 5rem;
  z-index: 2;
  display: inline-block;
  flex-direction: column;
  font-size: 16px;
  color: black;
  

  input {
    max-width: 100%;
    min-width: 100%;
    max-height: 35px;
    min-height: 35px;
    background-color: transparent;
    font-family: 'Roboto', sans-serif;
    border: 3px solid grey;
    color: black;
    text-indent: 5px;
    font-size: 20px;
    flex: 1;


    &:focus {
      border: 0px;
    }
  }

  label {
    max-width: 100%;
    min-width: 100%;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem; 
    display: block;
    flex: 1;
  }

  @media (max-width: 1300px) {
    padding: 0;
  }

  h2 {
    font-weight: lighter;
    margin: 0;
    padding-bottom: 40px;
  }

    button {
    flex: 1;
    font-weight: bold;
    font-size: 1.1rem;
    cursor: pointer;
    padding: 1rem 2rem;
    border: 3px solid #800080;
    background: transparent;
    color: #800080;
    transition: all 1s ease;
    font-family: 'Roboto', sans-serif;
    margin-top: 1rem;

    &:focus {
      outline: none;
    }

    &:hover {
      background: #800080;
      color: #fff;
    }

    @media (max-width: 1300px) {
      margin: 2rem 0rem 5rem 0rem;
    }
  }
`;

const StyledBase = styled(motion.div)`
  min-height: 10vh;
  color: black;

  display: block;
    padding: 2rem;
    text-align: center;
    justify-content: center;

  @media (max-width: 1300px) {
    display: block;
    padding: 2rem;
    text-align: center;
  }
`;
