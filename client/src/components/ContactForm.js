import React, { useRef } from 'react';
import emailjs from 'emailjs-com';
import styled from "styled-components";
import { motion } from "framer-motion";
import Wave from "./Wave";
import { titleAnim, fadeAnim, photoAnim } from "../animation";



const ContactForm = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

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
        },
        (error) => {
          console.log(error.text);
        }
      );
    
  };

  return (
    <StyledBase>
        <StyledForm ref={form} onSubmit={sendEmail}>
          <motion.h2 variants={titleAnim}>
            Ask us a <span>question</span>. 
                        </motion.h2>
                <motion.div >
                    <StyledHide>
                        <motion.div variants={titleAnim}>
                        <label>Email</label>
                        <input type="email" name="user_email" /> 
                        </motion.div>
                    </StyledHide>
                    <StyledHide>
                        <motion.div variants={titleAnim}>
                        <label>Subject</label>
                        <input type="text" name="subject" /> 
                        </motion.div>
                    </StyledHide>
                    <StyledHide>
                        <motion.div variants={titleAnim}>
                        <label>Message</label>
                        <textarea name="message" />
                        </motion.div>
                    </StyledHide>
                    <motion.button variants={fadeAnim} type="submit" value="Send">
                      Send
                    </motion.button>
                </motion.div>
            </StyledForm>
            <StyledImage>
            <motion.img 
                    variants={photoAnim} 
                    src={"https://cdn.britannica.com/36/6236-050-4D66A23E/Slovenia-map-features-locator.jpg"} 
                    alt="Location map"
                />
            </StyledImage>
            <Wave/>
        </StyledBase>


  );
};

export default ContactForm;

// Styles

export const StyledImage = styled.div`
    flex: 1;
    overflow: hidden;
    z-index: 2;

    img {
        width: 100%;
        height: 60vh;
        object-fit: cover;
    }
`

export const StyledForm = styled.form`
    flex: 1;
    padding-right: 5rem;
    z-index: 2;
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    font-size: 16px;
    
    textarea {
      max-width: 100%;
      min-width: 100%;
      width: 100%;
      max-height: 100px;
      min-height: 100px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);

      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }

    label {
      margin-top: 1rem;
    }

    input[type="submit"] {
      margin-top: 2rem;
      cursor: pointer;
      background: rgb(249, 105, 14);
      color: white;
      border: none;
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

        font-weight: bold;
        font-size: 1.1rem;
        cursor: pointer;
        padding: 1rem 2rem;
        border: 3px solid #800080;
        background: transparent;
        color: #fff;
        transition: all 1s ease;
        font-family: 'Roboto', sans-serif;

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
`

export const StyledHide = styled.div`
    overflow: hidden;
`





export const StyledBase = styled(motion.div)`
    min-height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5rem 10rem;
    color: white;

    

    @media (max-width: 1300px) {
        display: block;
        padding: 2rem;
        text-align: center;
    }
`
