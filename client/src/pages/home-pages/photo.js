import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';

import { motion } from "framer-motion";
import { pageAnimation, fadeAnim, photoAnim, lineAnim } from "../../animation";


const Photo = () => { 

    return (

        <StyledWork 
            variants={pageAnimation} 
            initial="hidden" 
            animate="show"
            exit="exit"
            style={{background: "#E8DFC2"}}
        >
            {categoryData.map((category) => (
                <StyledCategory key={category.categoryId}>
                    <motion.h2 variants={fadeAnim}>{category.categoryName}</motion.h2>
                    <motion.div variants={lineAnim} className="line"></motion.div>
                    <Link to={`/work/photo/${category.categoryId}`}>
                        <StyledHide>
                            <motion.img
                                variants={photoAnim}
                                src={category.imagePath}
                                alt={category.categoryName}
                            />
                        </StyledHide>
                    </Link>
                </StyledCategory>
            ))}
        </StyledWork> 
    )
}

const categoryData = [
    {
      categoryName: "Cars",
      categoryId: 1,
      imagePath: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1883&q=80",
    },
    {
      categoryName: "Love",
      categoryId: 2,
      imagePath: "https://plus.unsplash.com/premium_photo-1671616724629-c2fa8455c28f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    },
    {
        categoryName: "Animals",
        categoryId: 3,
        imagePath: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
      },
      {
        categoryName: "Sun",
        categoryId: 4,
        imagePath: "https://images.unsplash.com/photo-1549849171-09f62448709e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      },
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


export default Photo;