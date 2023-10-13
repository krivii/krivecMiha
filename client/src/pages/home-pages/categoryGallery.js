import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { motion } from "framer-motion";
import { pageAnimation, fadeAnim, photoAnim, lineAnim, sliderAnim,sliderContainerAnim } from "../../animation";


const CategoryGallery = () => {
    const { categoryId } = useParams();
   
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

      const [category, setCategory] = useState([]);



    useEffect(() => {
        console.log("TETE SEM")
        fetch(`http://localhost:3001/api/admin/category/${categoryId}`)
            .then((response) => response.json())
            .then((data) => {           
            setCategory(data.category);
           
            })
            .catch((error) => {
            console.error('Error fetching user data:', error);
            });
    }, []);

    

    if (category.length === 0 ) {

        return <div>Loading...</div>;
      }

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
        <motion.h2 variants={fadeAnim}>{category.name}</motion.h2>
        <StyledHide>
          <motion.img 
            variants={photoAnim} 
            src={"http://localhost:3001/" + category.cover} 
            alt={category.name}
          />
        </StyledHide>
      </StyledCategory>
            <h4>{category.description}</h4>
            <motion.div className="line"></motion.div>
            {category.photos.map((photo) => (
                photo === category.cover ? null : (
                    <StyledImage key={photo}>
                    <img src={"http://localhost:3001/" + photo} alt={photo} />
                    </StyledImage>
                )
            ))}
        </StyledWork> 

    )
}





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
        padding: 10% 30% 10% 10%;

        @media (max-width: 1300px) {
        padding: 10%;
    }
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