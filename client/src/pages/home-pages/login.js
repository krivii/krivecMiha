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