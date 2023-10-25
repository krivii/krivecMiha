import React, { useRef, useState } from 'react';
import styled from "styled-components";
import { motion } from "framer-motion";
import { fadeAnim, photoFromAboveAnim } from "../animation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRegister } from '../hooks/useRegister';




const RegisterForm = () => {

  const form = useRef();
  const {signup, isLoading, error} = useRegister();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");

    const notifyError = (error) => {
      toast.error(error, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
        });
    }

    const handleRegister = async (event) => {
        event.preventDefault();
        if (password !== passwordRepeat) {
          notifyError("Passwords don't match");
          return;
        }
        await signup(name, email, password);
    }

    
  return (

    <StyledBase>
      <StyledForm ref={form} onSubmit={handleRegister}>
        <motion.h2 >
          Sign <span>up</span>. 
        </motion.h2>
        <motion.div variants={photoFromAboveAnim}>
            
            <label>Name</label>
            <input type="text" 
                   id="name" 
                   value={name}
                   onChange={(event)=> setName(event.target.value)} />             
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
            <label>Repeat Password</label>
            <input
              type="password"
              id="passwordRepeat"
              value={passwordRepeat}
              onChange={(event) => setPasswordRepeat(event.target.value)}
            />
    
          <motion.button disabled={isLoading} variants={fadeAnim} type="submit" >
            Sign up
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
                        marginTop: '20px'
                        }}
                        >{error}
                        </div>
           }
          <p>
          Already have an account? <a href="/login" style={{fontSize: '25px' ,color: '#800080' }}>Login</a>.
          </p>
        </motion.div>
      </StyledForm>
      <ToastContainer />
    </StyledBase>
  );
};

export default RegisterForm;



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
  

  input {
    max-width: 100%;
    min-width: 100%;
    max-height: 35px;
    min-height: 35px;
    background-color: transparent;
    font-family: 'Roboto', sans-serif;
    border: 3px solid grey;
    color: white;
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
    color: #fff;
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

  display: flex;
  align-items: center;

  padding: 0rem 8rem;
  color: white;
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
