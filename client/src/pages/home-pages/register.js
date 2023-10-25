//Spletna aplikacija za fotografe/ Web application for photographers

//Copyright (C) 2023  Luka Krivec (lk2378@student.uni-lj.si). Licensed under the GPL-3.0 or later.import React, { useState } from 'react';


import RegisterForm from '../../components/RegisterForm'
import { motion } from "framer-motion";
import { pageAnimation } from "../../animation";



const Register = () => {
   
    return (    
        <motion.div 
            variants={pageAnimation} 
            initial="hidden" 
            animate="show"
            exit="exit"
        >
            <RegisterForm />
        </motion.div>    

    );

};

export default Register;