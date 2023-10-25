//Spletna aplikacija za fotografe/ Web application for photographers

//Copyright (C) 2023  Luka Krivec (lk2378@student.uni-lj.si). Licensed under the GPL-3.0 or later.

import React from 'react';
import LoginForm from '../../components/LoginForm'
import { motion } from "framer-motion";
import { pageAnimation } from "../../animation";



const Login = () => {
 
    return (    
        <motion.div 
            variants={pageAnimation} 
            initial="hidden" 
            animate="show"
            exit="exit"
        >
            <LoginForm />
        </motion.div>           
    );

};

export default Login;