import React, { useState } from 'react';


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