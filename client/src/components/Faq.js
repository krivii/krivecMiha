import React, { useState, useEffect  } from "react";
import { useInView } from "react-intersection-observer";

import styled from 'styled-components';
import { AnimateSharedLayout, useAnimation, motion } from "framer-motion";

import { fadeAnim } from "../animation";
import { StyledBase } from "../styled";


const FaqSection = () => {


    return (

        <StyledFaq >        
            <h2>Any Questions <span>FAQ</span> </h2>
            <layout>
                <Toggle title="Where are you positioned?">
                    <div className="answers">
                        <p>Lorem ipsum dolor sit amet.</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, corrupti!</p>
                    </div>
                </Toggle>
                <Toggle title="What products do you offer?">
                    <div className="answers">
                        <p>Lorem ipsum dolor sit amet.</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, corrupti!</p>
                    </div>
                </Toggle>
                <Toggle title="What is your pricing?">
                    <div className="answers">
                        <p>Lorem ipsum dolor sit amet.</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, corrupti!</p>
                    </div>
                </Toggle>
                <Toggle title="What is your availability?">
                    <div className="answers">
                        <p>Lorem ipsum dolor sit amet.</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, corrupti!</p>
                    </div>
                </Toggle>
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


export const useScroll = () => {
    const controls = useAnimation()
    const [element, view] = useInView({ threshold: 0.3 })
    if (view) {
        controls.start("show")
    }
    else {
        controls.start("hidden")
    }
    return [element, controls]
}

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
        padding: 3rem 0;
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