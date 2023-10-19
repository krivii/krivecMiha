import React from 'react';
import AdminLoginForm from '../../components/AdminLoginForm'
import { motion } from "framer-motion";
import { pageAnimation } from "../../animation";



const AdminLogin = () => {
 
    return (    
        <motion.div 
            variants={pageAnimation} 
            initial="hidden" 
            animate="show"
            exit="exit"
        >
            <AdminLoginForm />
        </motion.div>           
    );

};

export default AdminLogin;