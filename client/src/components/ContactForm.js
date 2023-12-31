//Spletna aplikacija za fotografe/ Web application for photographers

//Copyright (C) 2023  Luka Krivec (lk2378@student.uni-lj.si). Licensed under the GPL-3.0 or later.

import React, { useRef } from 'react';
import emailjs from 'emailjs-com';
import styled from "styled-components";
import { motion } from "framer-motion";
import { fadeAnim, photoFromAboveAnim, photoAnim } from "../animation";
// import WaveContact from "./WaveContact";
import LjubljanaImg from '../assets/contact.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const ContactForm = () => {

  const form = useRef();

  const notifySuccess = () => {
    toast.success('Message sent!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  }
  const notifyError = () => {
    toast.error('Please fill in all fields!', {
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
  
  
  const sendEmail = (e) => {

    e.preventDefault();


  const emailField = form.current.querySelector('input[name="user_email"]');
  const subjectField = form.current.querySelector('input[name="subject"]');
  const messageField = form.current.querySelector('textarea[name="message"]');


  if (!emailField.value || !subjectField.value || !messageField.value) {

    notifyError();
    return; 
  }

  emailjs
  .sendForm(
    "service_twh6vzf",
    "template_yftjf0x",
    form.current,
    "h2qNYqo3OHd3NAvHE"
  )
  .then(
    (result) => {
      console.log(result.text);
      console.log("message sent");


      emailField.value = "";
      subjectField.value = "";
      messageField.value = "";


      notifySuccess();
    },
    (error) => {
      console.log(error.text);
    }
  );
};

  return (
    <StyledBase>
      <StyledForm ref={form} onSubmit={sendEmail}>
        <motion.h2 >
          Ask us a <span>question</span>. 
        </motion.h2>
        <motion.div variants={photoFromAboveAnim}>
            
            <label>Email</label>
            <input type="email" name="user_email" />             
            <label>Subject</label>
            <input type="text" name="subject" /> 
            <label>Message</label>
            <textarea name="message" />          
          <motion.button variants={fadeAnim} type="submit" value="Send">
            Send
          </motion.button>
        </motion.div>
      </StyledForm>
      <StyledImage>
        <motion.img 
        variants={photoAnim} 
          src={LjubljanaImg} 
          alt="Location map"
        />
      </StyledImage>
   
      <ToastContainer />
    </StyledBase>
  );
};

export default ContactForm;



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
  

  textarea {
    max-width: 100%;
    min-width: 100%;
    max-height: 100px;
    min-height: 100px;
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
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0rem 8rem;
  color: white;

  @media (max-width: 1300px) {
    display: block;
    padding: 2rem;
    text-align: center;
  }
`;
