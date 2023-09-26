import React, { useEffect } from 'react';

import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { motion } from "framer-motion";
import { pageAnimation, fadeAnim, photoAnim, lineAnim, sliderAnim,sliderContainerAnim } from "../../animation";


const CategoryGallery = () => {
    const { categoryId } = useParams();
    const selectedCategory = categoryData.find(category => category.categoryId === parseInt(categoryId, 10));


    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    return (
        <StyledWork 
            variants={pageAnimation} 
            initial="hidden" 
            animate="show"
            exit="exit"

        >
            <motion.div variants={sliderContainerAnim}>
                <StyledFrame1 variants={sliderAnim}></StyledFrame1>
                <StyledFrame2 variants={sliderAnim}></StyledFrame2>
                <StyledFrame3 variants={sliderAnim}></StyledFrame3>
                <StyledFrame4 variants={sliderAnim}></StyledFrame4>

            </motion.div>
            <StyledCategory>
        <motion.h2 variants={fadeAnim}>{selectedCategory.categoryName}</motion.h2>
        <StyledHide>
          <motion.img 
            variants={photoAnim} 
            src={selectedCategory.imagePath} 
            alt={selectedCategory.categoryName}
          />
        </StyledHide>
      </StyledCategory>
            <h4>{selectedCategory.description}</h4>
            <motion.div className="line"></motion.div>
            {categoryData.map((category) => (
                <StyledImage>
                    <img src={category.imagePath} 
                    alt={category.categoryName} />
                </StyledImage>
            ))}
        </StyledWork> 

    )
}

const categoryData = [
    {
      categoryName: "Cars",
      categoryId: 1,
      imagePath: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1883&q=80",
      description: "Explore the world of fast cars and luxury vehicles."
    },
    {
      categoryName: "Love",
      categoryId: 2,
      imagePath: "https://plus.unsplash.com/premium_photo-1671616724629-c2fa8455c28f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      description: "Capture the essence of love and affection in these images."
    },
    {
        categoryName: "Animals",
        categoryId: 3,
        imagePath: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
        description: "Witness the beauty and diversity of animals from around the world."
    },
    {
        categoryName: "Sun",
        categoryId: 4,
        imagePath: "https://images.unsplash.com/photo-1549849171-09f62448709e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        description: "Chase the sun and capture its warm and vibrant moments."
    },
];


  const StyledImage = styled.div`
    min-height: 50vh;
    
    img {
        width: 100%;
        height: 100vh;
        object-fit: cover;
    }
`


  const StyledWork = styled(motion.div)`
    min-height: 100vh;
    overflow: hidden;
    padding: 1rem 0;

    @media (max-width: 1300px) {
        padding: 2rem 2rem;
    }

    h2 {

        padding: 1rem 5rem;
        color: white;
    }

    h4 {
        font-weight: lighter;
        margin: 0;
        padding: 2rem 1.5rem;
        color: white;
    }

    .line {
    height: 0.5rem;
    padding: 0 1.5rem;
    background: #800080;
    margin-bottom: 3rem;
}
`

const StyledCategory = styled(motion.div)`
    padding-bottom: 5rem;

    img {
        width: 100%;
        height: 70vh;
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

export default CategoryGallery;