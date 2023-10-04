import React, { useState } from 'react';
import axios from "axios";
// import dotenv from 'dotenv';
// dotenv.config({ path: '../../../.env' });
// require('dotenv').config({ path: '../../../.env' });

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