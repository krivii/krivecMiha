import { motion } from "framer-motion";
import styled from 'styled-components';

const WaveContact = () => {
    return (
        <StyledWaveSvg 
            viewBox="0 0 1000 726"  
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <motion.path 
                initial={{ pathLength: 0, pathOffset: 1 }}
                animate={{ pathLength: 1, pathOffset: 0 }}
                transition={{ duration: 1 }}
                d="M10,80 S60,10 110,80"
                stroke="#A17800" 
                strokeOpacity="0.4" 
                strokeWidth="8"
            />

        </StyledWaveSvg>
    );
};

const StyledWaveSvg = styled.svg`
    position: absolute;
    left: 0;
    z-index: -1;
`;

export default WaveContact;
