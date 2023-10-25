//Spletna aplikacija za fotografe/ Web application for photographers

//Copyright (C) 2023  Luka Krivec (lk2378@student.uni-lj.si). Licensed under the GPL-3.0 or later.

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from "framer-motion";



const FaqSection = () => {
  const [faqData, setFAQData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/api/admin/faq/`)
      .then((response) => response.json())
      .then((data) => {           
        setFAQData(data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  return (
    <StyledFaq >                     
      <h2>Any Questions <span>FAQ</span> </h2>
      <layout>
        {faqData.map((item, index) => (
          <Toggle key={index} title={item.question}>
            <div className="answers">
              <p>{item.answer}</p>
            </div>
          </Toggle>
        ))}
      </layout>
    </StyledFaq>
  )
}

const Toggle = ({ children, title }) => {
    const [toggle, setToggle] = useState(false);
    return (
        <motion.div 
            layout 
            className="question" 
            onClick={() => setToggle(!toggle)}
        >
            <motion.h4 layout>{title}</motion.h4>
            {toggle ? children : ''}
            <div className="faq-line"></div>
        </motion.div>
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
`

const StyledFaq = styled(StyledBase)`
    display: block;

    span {
        display: block;
    }

    h2 {
        padding-bottom: 2rem;
        font-weight: lighter;
        margin: 0;
    }

    h4 {

        margin: 0;
    }

    .faq-line {
        background: #ccc;
        height: .2rem;
        width: 100%;
        margin: 2rem 0;
    }

    .question {
        padding: 1rem 0;
        cursor: pointer;
    }

    .answers {
        padding: .5rem 0;
        margin: 0;

        p {
            padding: .5rem 0;
            margin: 0;
        }
    }
`

export default FaqSection;