import styled from 'styled-components';
import { motion } from "framer-motion";


export const StyledBase = styled(motion.div)`
    min-height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5rem 10rem;
    color: white;

    

    @media (max-width: 1300px) {
        display: block;
        padding: 2rem;
        text-align: center;
    }
`

export const StyledDescription = styled.div`
    flex: 1;
    padding-right: 5rem;
    z-index: 2;


    @media (max-width: 1300px) {
        padding: 0;
    }

    h2 {
        font-weight: lighter;
        margin: 0;
    }

    button {

        font-weight: bold;
        font-size: 1.1rem;
        cursor: pointer;
        padding: 1rem 2rem;
        border: 3px solid #800080;
        background: transparent;
        color: #fff;
        transition: all 1s ease;
        font-family: 'Roboto', sans-serif;

        &:focus {
            outline: none;
        }

        &:hover {
            background: #800080;
            color: #fff;
        }

        @media (max-width: 1300px) {
            margin: 2rem 0rem 5rem 0rem;
        }
    }
`

export const StyledImage = styled.div`
    flex: 1;
    overflow: hidden;
    z-index: 2;

    img {
        width: 100%;
        height: 80vh;
        object-fit: cover;
    }
`

export const StyledHide = styled.div`
    overflow: hidden;
`