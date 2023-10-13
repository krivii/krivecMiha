import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';

import { motion } from "framer-motion";
import { pageAnimation, fadeAnim, photoAnim, lineAnim } from "../../animation";


const Photo = () => { 
    useEffect(() => {
        window.scrollTo(0, 0); 
      }, []);

    const [categoryData, setCatData] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3001/api/admin/category`)
          .then((response) => response.json())
          .then((data) => {           
            setCatData(data);
          })
          .catch((error) => {
            console.error('Error fetching video data:', error);
          });
      }, []);

  if (categoryData.length === 0) {

    return <div>Loading...</div>;
  }

    return (

        <StyledWork 
            variants={pageAnimation} 
            initial="hidden" 
            animate="show"
            exit="exit"
            style={{background: "#E8DFC2"}}
        >

            {categoryData.map((category) => (
                <StyledCategory key={category._id}>
                    <motion.h2 variants={fadeAnim}>{category.name}</motion.h2>
                    <motion.div variants={lineAnim} className="line"></motion.div>
                    <Link to={`/work/photo/${category._id}`}>
                        <StyledHide>
                            <motion.img
                                variants={photoAnim}
                                src={"http://localhost:3001/" + category.cover}
                                alt={category.name}
                            />
                        </StyledHide>
                    </Link>
                </StyledCategory>
            ))}
        </StyledWork> 
    )
}

  
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