import React from 'react'
import styled from 'styled-components';
import WaveAbout from "../../components/WaveAbout";
import Gallery from "../../components/Gallery";
import { motion } from "framer-motion";
import { titleAnim, fadeAnim, photoAnim } from "../../animation";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Library = () => {

    const username = "Luka";

    const navigate = useNavigate();

    const notify = () => {
        toast.success('Message sent!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    };

    const handleSignOut = () => {
        // Perform sign-out logic if needed
        // Then navigate to the AboutUs page and pass a reference to the notify function
        navigate('/about', { state: { notifyReference: notify } });
    };
    


    return (
        <motion.div >
            <StyledBase>
                <StyledDescription>
                <motion.div >
                    <StyledHide>
                        <motion.h2 variants={titleAnim}>
                            Hello <span>{username}</span>,
                        </motion.h2>
                    </StyledHide>
                    <StyledHide>
                        <motion.h2 variants={titleAnim}>
                            welcome to your 
                        </motion.h2>
                    </StyledHide>
                    <StyledHide>
                        <motion.h2 variants={titleAnim}>
                            personal <span>art</span> Library.
                        </motion.h2>
                    </StyledHide>
                    <motion.p variants={fadeAnim}>
                        In your art Library you can explore the custom-made photo gallery we create for you. All your orders allow us to transform your precious memories into a beautiful collection you can find right here. 
                    </motion.p>                    
                </motion.div>
                </StyledDescription>
                <StyledLogout>
                    <motion.div >
                        <StyledHide>
                            <motion.h2 variants={titleAnim}>
                            To <span>sign out</span> of your account,
                            </motion.h2>
                            <motion.h2 variants={titleAnim}>
                            please click the button
                            </motion.h2>
                            <motion.h2 variants={titleAnim}>
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
        padding: 0;

    }

`

export const StyledLogout = styled.div`
    flex: 1;
    margin: 5rem 5rem 15rem 25rem;
    z-index: 2;
    text-align: center;
    color: black;
    background-color: rgba(250, 250, 250, 0.8);
    border-radius: 10px;
    padding: 2rem;
    max-width: 20%;

    @media (max-width: 1300px) {
        padding-top: 2rem ;
        margin: 0 ;
        max-width: 100%;
    }

    h2 {
        font-weight: lighter;
        margin: 0;
        padding: 0;
        font-size: 30px;
        font-weight: bold;

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


export default Library;