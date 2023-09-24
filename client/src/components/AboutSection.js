import React from 'react'
// import home1 from '../images/home1.png';
import Wave from "./Wave";

import { StyledBase, StyledDescription, StyledImage, StyledHide } from "../styled";

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
                            eternalize your  <span>Precious </span> 
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
                    <a href="http://localhost:3000/contact">
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



export default AboutSection