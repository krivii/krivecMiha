import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';

import { motion } from "framer-motion";
import { pageAnimation, fadeAnim, photoAnim, lineAnim } from "../../animation";


const Video = () => { 

    return (

        // <StyledWork 
        //     variants={pageAnimation} 
        //     initial="hidden" 
        //     animate="show"
        //     exit="exit"
        //     style={{background: "#E8DFC2"}}
        // >
        //     {categoryData.map((category) => (
        //         <StyledCategory key={category.categoryId}>
        //             <motion.h2 variants={fadeAnim}>{category.categoryName}</motion.h2>
        //             <motion.div variants={lineAnim} className="line"></motion.div>
                    
        //                 <StyledHide>
        //                     <motion.img
        //                         variants={photoAnim}
        //                         src={category.imagePath}
        //                         alt={category.categoryName}
        //                     />
        //                 </StyledHide>
                    
        //         </StyledCategory>
        //     ))}
        // </StyledWork> 
        <StyledWork 
        variants={pageAnimation} 
        initial="hidden" 
        animate="show"
        exit="exit"
        style={{ background: "#E8DFC2" }}
      >
        {videoData.map((video) => (
          <StyledCategory key={video.videoId}>
            <motion.h2 variants={fadeAnim}>{video.name}</motion.h2>
            <motion.div variants={lineAnim} className="line"></motion.div>
            <div>
                <iframe src="https://www.youtube.com/embed/MWG9lqtfu44?si=wzm9j9eaWnq7vuid" frameborder="0"></iframe>
            </div>

            
          </StyledCategory>
        ))}
      </StyledWork>
      
    )
}

const videoData = [
    {
      videoId: 1,
      name: "Cars",
      iframe: '<iframe width="560" height="315" src="https://www.youtube.com/embed/MWG9lqtfu44?si=wzm9j9eaWnq7vuid" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    }
    // {
    //   videoId: 2,
    //   name: "Nature Documentary",
    //   iframe: '<iframe width="560" height="315" src="https://www.youtube.com/embed/3uzucyoUe6Q?si=hbFr8mH8BQFy8Dq2" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    // },
    // {
    //   videoId: 3,
    //   name: "Cooking Tutorial",
    //   iframe: '<iframe width="560" height="315" src="https://www.youtube.com/embed/aopS3q6f1GY?si=iGjJuj1Hd1fL9Mj1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    // },
    // {
    //   videoId: 4,
    //   name: "Travel Vlog",
    //   iframe: '<iframe width="560" height="315" src="https://www.youtube.com/embed/lsTgWn9FEQc?si=jFO6opULdrqoXWSy" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    // },
];

  

const StyledWork = styled(motion.div)`
    min-height: 100vh;
    overflow: hidden;
    padding: 5rem 10rem;

    @media (max-width: 1300px) {
        padding: 2rem 2rem;
    }

    h2 {
        padding: 1rem 0;
    }
`

const StyledCategory = styled(motion.div)`
    padding-bottom: 10rem;

.line {
    height: 0.5rem;
    background: #800080;
    margin-bottom: 3rem;
}

img {
    width: 100%;
    height: 70vh;
    object-fit: cover;
}
`

const StyledHide = styled(motion.div)`
    overflow: hidden;
`


export default Video;