//Spletna aplikacija za fotografe/ Web application for photographers

//Copyright (C) 2023  Luka Krivec (lk2378@student.uni-lj.si). Licensed under the GPL-3.0 or later.

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