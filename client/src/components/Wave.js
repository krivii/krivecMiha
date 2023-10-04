import { motion } from "framer-motion";
import styled from 'styled-components';

const Wave = () => {
    return (
        <StyledWaveSvg 
            viewBox="0 0 1000 726"  
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <motion.path 
                initial={{ pathLength: 0, pathOffset: 1 }}
                animate={{ pathLength: 1, pathOffset: 0 }}
                transition={{ duration: 2 }}
                d="M0 363C183.32 500 366.64 306.47 600 306.47C782.01 306.47 1015.69 516.685 1204.32 516.685C1392.95 516.685 1440 382.187 1440 306.47"
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

export default Wave;
