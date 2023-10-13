import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';

import { motion } from "framer-motion";
import { pageAnimation, fadeAnim, photoAnim, lineAnim, sliderAnim,sliderContainerAnim } from "../../animation";




const OurWork = () => { 
    const [photoImage, setPhotoImage] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3001/api/admin/pphoto/Photographs`)
            .then((response) => response.json())
            .then((data) => {           
            setPhotoImage(data);
            })
            .catch((error) => {
            console.error('Error fetching user data:', error);
            });
    }, []);

    const [videoImage, setVideoImage] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3001/api/admin/pphoto/Videos`)
            .then((response) => response.json())
            .then((data) => {           
            setVideoImage(data);
            })
            .catch((error) => {
            console.error('Error fetching user data:', error);
            });
    }, []);

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
                <motion.div variants={lineAnim} className="lineP"></motion.div>
                <Link to="/work/photo">
                    <StyledHide>
                        <motion.img 
                            variants={photoAnim} 
                            src={photoImage.path}
                            alt={photoImage.name}
                        />
                    </StyledHide>
                </Link>
            </StyledMedia>
            <StyledMedia>
                <motion.h2 variants={fadeAnim}>Videos</motion.h2>
                <motion.div variants={lineAnim} className="lineV"></motion.div>
                <Link to="/work/video">
                <StyledHide>
                        <motion.img 
                            variants={photoAnim} 
                            src={videoImage.path}
                            alt={videoImage.name}
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


    .lineP {
        height: 0.5rem;
        background: #800080;
        margin-bottom: 3rem;
    }
    .lineV {
        height: 0.5rem;
        background: #A17800;
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