import React from 'react'
import Wave from "./Wave";
import styled from 'styled-components';

import { motion } from "framer-motion";
import { titleAnim, fadeAnim, photoAnim } from "../animation";

const AboutSection = () => {

    return (
        
        <StyledBase>
             <StyledDescription>
                <motion.div >
                    <StyledHide>
                        <motion.h2 variants={titleAnim}>
                            We strive to 
                        </motion.h2>
                    </StyledHide>
                    <StyledHide>
                        <motion.h2 variants={titleAnim}>
                            eternalize your <span>precious </span> 
                        </motion.h2>
                    </StyledHide>
                    <StyledHide>
                        <motion.h2 variants={titleAnim}>
                            moments.
                        </motion.h2>
                    </StyledHide>
                    <motion.p variants={fadeAnim}>
                    Reach out to us with your unique ideas. We are passionate about turning them into visual masterpieces. From brainstorming to execution, we provide the expertise and creativity required.
                    </motion.p>
                    <a href="/contact">
                        <motion.button variants={fadeAnim}>
                            Contact Us
                        </motion.button>
                    </a>
                    
                </motion.div>
            </StyledDescription>
            <StyledImage>
                <motion.img 
                    variants={photoAnim} 
                    src={"https://www.researchgate.net/profile/Paul-Rodriguez-5/publication/265988128/figure/fig1/AS:459614656438273@1486592081799/Input-test-images-a-Cameraman-grayscale-b-grayscale-Lena-and-c-color-Lena-All.png"} 
                    alt="The guy with cammera"
                />
            </StyledImage>
               <Wave />
        </StyledBase>
    )
}



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
`;

export const StyledDescription = styled.div`
    flex: 1;
    padding-right: 5rem;
    z-index: 2;


    @media (max-width: 1300px) {
        padding: 0;
    }

    h2 {
        font-weight: lighter;
        margin: 0;
        padding: 0;
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
`;

export const StyledImage = styled.div`
    flex: 1;
    overflow: hidden;
    z-index: 2;

    img {
        width: 100%;
        height: 80vh;
        object-fit: cover;
    }
`;

export const StyledHide = styled.div`
    overflow: hidden;
`;


export default AboutSection;