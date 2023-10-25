//Spletna aplikacija za fotografe/ Web application for photographers

//Copyright (C) 2023  Luka Krivec (lk2378@student.uni-lj.si). Licensed under the GPL-3.0 or later.

import React from 'react'

import AboutSection from '../../components/AboutSection'
import FaqSection from '../../components/Faq'
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { motion } from "framer-motion";
import { pageAnimation } from "../../animation";

const AboutUs = () => {
    const location = useLocation();
    const { notify } = location.state || {}; // Destructure notify from state or set it to an empty object

    // Now you can use the notify function if it's available
    if (notify) {
        notify();
    }
    return (
        <motion.div 
            variants={pageAnimation} 
            initial="hidden" 
            animate="show"
            exit="exit"
        >
            <AboutSection />
            <FaqSection />
            <ToastContainer />
        </motion.div>
    )
}

export default AboutUs;