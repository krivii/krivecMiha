import React from 'react'
import { Link } from "react-router-dom";
import styled from 'styled-components';

import { motion } from "framer-motion";
import { pageAnimation, fadeAnim, photoAnim, lineAnim, sliderAnim,sliderContainerAnim } from "../../animation";




const OurWork = () => { 

    return (

        <StyledWork 
            variants={pageAnimation} 
            initial="hidden" 
            animate="show"
            exit="exit"
            style={{background: "#E8DFC2"}}
        >
            <motion.div variants={sliderContainerAnim}>
                <StyledFrame1 variants={sliderAnim}></StyledFrame1>
                <StyledFrame2 variants={sliderAnim}></StyledFrame2>
                <StyledFrame3 variants={sliderAnim}></StyledFrame3>
                <StyledFrame4 variants={sliderAnim}></StyledFrame4>

            </motion.div>

            <StyledMedia>
                <motion.h2 variants={fadeAnim}>Photographs</motion.h2>
                <motion.div variants={lineAnim} className="line"></motion.div>
                <Link to="/work/photo">
                    <StyledHide>
                        <motion.img 
                            variants={photoAnim} 
                            src={"https://cdn.pixabay.com/photo/2023/07/14/10/30/de-havilland-tiger-moth-8126721_1280.jpg"} 
                            alt="Photos"
                        />
                    </StyledHide>
                </Link>
            </StyledMedia>
            <StyledMedia>
                <motion.h2 variants={fadeAnim}>Videos</motion.h2>
                <motion.div variants={lineAnim} className="line"></motion.div>
                <Link to="/work/videos">
                <StyledHide>
                        <motion.img 
                            variants={photoAnim} 
                            src={"https://cdn.pixabay.com/photo/2022/11/09/14/22/youtube-icon-7580719_1280.jpg"} 
                            alt="Videos"
                        />
                    </StyledHide>
                </Link>
            </StyledMedia>
        </StyledWork> 
    )
}

const StyledWork = styled(motion.div)`
    min-height: 100vh;
    overflow: hidden;
    padding: 2rem 5rem;
    display: flex; 
    flex-wrap: nowrap; 


    @media (max-width: 1300px) {
        padding: 2rem 2rem;
        display: block;
    }

    h2 {
        padding: 1rem 0;
    }
`

const StyledMedia = styled(motion.div)`
    flex: 1; 
    padding: 0rem 3rem; 


    .line {
        height: 0.5rem;
        background: #800080;
        margin-bottom: 3rem;
    }

    img {
        width: 100%;
        height: 50vh;
        object-fit: cover;
    }
`

const StyledHide = styled(motion.div)`
    overflow: hidden;
`

const StyledFrame1 = styled(motion.div)`
    position: fixed;
    left: 0;
    top: 10%;
    width: 100%;
    height: 100vh;
    background: #800080;
    z-index: 2;
`

const StyledFrame2 = styled(StyledFrame1)`
    background: #FFF800;
`

const StyledFrame3 = styled(StyledFrame1)`
    background: #A17800;
`

const StyledFrame4 = styled(StyledFrame1)`
    background: #31013F;
`


export default OurWork;