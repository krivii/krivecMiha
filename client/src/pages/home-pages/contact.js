import ContactForm from '../../components/ContactForm'
import { motion } from "framer-motion";
import { pageAnimation } from "../../animation";

const ContactUs = () => {
    return (
        <motion.div 
            variants={pageAnimation} 
            initial="hidden" 
            animate="show"
            exit="exit"
        >
            <ContactForm />
        </motion.div>
    )
}

export default ContactUs;