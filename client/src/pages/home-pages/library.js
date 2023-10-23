import React from 'react'
import styled from 'styled-components';
import WaveAbout from "../../components/Wave";
import Gallery from "../../components/Gallery";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { titleAnim, fadeAnim, pageAnimation, lineAnim} from "../../animation";
import { useLogout } from '../../hooks/useLogout';
import {useAuthContext} from '../../hooks/useAuthContext'  


const Library = () => {


    const {user} = useAuthContext();
    const navigate = useNavigate();
    const {logout} = useLogout();


    const handleSignOut = () => {
        logout();
    };


    


    return (
        <motion.div 
        variants={pageAnimation} 
        initial="hidden" 
        animate="show"
        exit="exit"
        >
            <StyledBase>
                <StyledDescription>
                <motion.div >
                    <StyledHide>
                        <motion.h2 variants={titleAnim}>
                            Hello, <span>{user.name}</span>!
                        </motion.h2>
                    </StyledHide>
                    <StyledHide>
                        <motion.h2 variants={titleAnim}>
                            Welcome to your 
                        </motion.h2>
                    </StyledHide>
                    <StyledHide>
                        <motion.h2 variants={titleAnim}>
                            personal  <span>account</span>.
                        </motion.h2>
                    </StyledHide>
                    <motion.p variants={fadeAnim}>
                        In your account you can explore the custom-made photo galleries we create for you. All your orders allow us to transform your precious memories into a beautiful collection you can find right here. 
                    </motion.p>                    
                </motion.div>
                </StyledDescription>
                <StyledLogout>
                    <motion.div >
                        <StyledHide>
                            <motion.h2 >
                            To <span>sign out</span> of your account,
                            </motion.h2>
                            <motion.h2 >
                            please click the button
                            </motion.h2>
                            <motion.h2 >
                            located below.
                            </motion.h2>
                        </StyledHide>
                            <motion.button variants={fadeAnim} onClick={handleSignOut} >
                                Sign out
                            </motion.button>
                    </motion.div>
                </StyledLogout>
                <WaveAbout />
            </StyledBase>
            <StyledBaseTitle>
                <StyledTitle>
                    <motion.h2 >
                            Your photo gallery
                        </motion.h2>
                        <motion.div  className="line"></motion.div>
               </StyledTitle>
                
            </StyledBaseTitle>
            <Gallery />
        </motion.div>

    )
}

export const StyledBase = styled(motion.div)`
    min-height: 60vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5rem 10rem;
    color: white;

    

    @media (max-width: 1300px) {
        min-height: 75vh;
        display: block;
        padding: 2rem;
        text-align: center;
    }
`

export const StyledBaseTitle = styled(motion.div)`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10%;
    color: white;

    @media (max-width: 1300px) {
        display: block;
        padding: 2rem;
        text-align: center;
    }

    .line {
        height: 0.5rem;
        background: #800080;
        margin-bottom: 1rem;
    }
`;
export const StyledTitle = styled.div`
    flex: 1;
    z-index: 2;

    @media (max-width: 1300px) {
        padding: 0;
    }

    h2 {
        font-weight: lighter;
        margin: 0;
        padding: 0;

    }


    button {

        font-weight: bold;
        font-size: 1.1rem;
        cursor: pointer;
        padding: 1rem 2rem;

        transition: all 0.6s ease;
        font-family: 'Roboto', sans-serif;
        margin-top: 3rem;
        border-radius: 10px;
        background: #148F40;
            color: #fff;

        &:focus {
            outline: none;
        }

        &:hover {

            background: transparent;
            border: 3px solid #148F40;
            color: #148F40;
        }

        @media (max-width: 1300px) {
            margin-top: 2rem;
        }
    }

`;

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
        padding: 0;

    }

`;

export const StyledLogout = styled.div`
    flex: 1;
    margin: 5rem 5rem 15rem 5rem;
    z-index: 2;
    text-align: center;
    color: black;
    background-color: rgba(250, 250, 250, 0.8);
    border-radius: 10px;
    padding: 2rem;
    max-width: 230px;
    


    @media (max-width: 1300px) {
        padding-top: 2rem ;
        margin: 0 20% ;
        max-width: 100%;
    }

    h2 {
        font-weight: lighter;
        margin: 0;
        padding: 0;
        font-size: 20px;
        font-weight: bold;

        @media (max-width: 1300px) {
        font-size: 15px;
        }

    }

    button {

        font-weight: bold;
        font-size: 1.1rem;
        cursor: pointer;
        padding: 1rem 2rem;
        border: 3px solid #800080;
        background: transparent;
        color: #800080;
        transition: all 0.6s ease;
        font-family: 'Roboto', sans-serif;
        margin-top: 3rem;
        border-radius: 10px;

        &:focus {
            outline: none;
        }

        &:hover {
            background: #800080;
            color: #fff;
        }

        @media (max-width: 1300px) {
            margin-top: 2rem;
        }
    }
`;

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
`;


export default Library;