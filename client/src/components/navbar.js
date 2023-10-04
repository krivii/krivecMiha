import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import LogoImg from '../assets/logo-white.png';

function Navbar() {
	const [extendNavbar, setExtendNavbar] = useState(false);
	const { pathname } = useLocation();

	// Function to close the navbar
	const closeNavbar = () => {
		setExtendNavbar(false);
	};

	return (
    
		<NavbarContainer extendNavbar={extendNavbar}>
			<NavbarInnerContainer>
				<LeftContainer>
					<NavbarLinkContainer>
						<ul>
							<li>
								<Link to='/' onClick={closeNavbar}>About</Link>
								<StyledLine
									transition={{ duration: 0.75 }}
									initial={{ width: '0%' }}
									animate={{ width: pathname === '/' ? '70%' : '0%' }}
								/>
							</li>
							<li>
								<Link to='/work' onClick={closeNavbar}>Our Work</Link>
								<StyledLine
									transition={{ duration: 0.75 }}
									initial={{ width: '0%' }}
									animate={{ width: pathname === '/work' ? '70%' : '0%' }}
								/>
							</li>
							<li>
								<Link to='/contact' onClick={closeNavbar}>Contact</Link>
								<StyledLine
									transition={{ duration: 0.75 }}
									initial={{ width: '0%' }}
									animate={{ width: pathname === '/contact' ? '70%' : '0%' }}
								/>
							</li>
							<li>
								<Link to='/library' onClick={closeNavbar}>My library</Link>
								<StyledLine
									transition={{ duration: 0.75 }}
									initial={{ width: '0%' }}
									animate={{ width: pathname === '/library' ? '70%' : '0%' }}
								/>
							</li>
							<OpenLinksButton 
                className="burger-button"
								onClick={() => {
									setExtendNavbar((curr) => !curr);
								}}
							>
								{extendNavbar ? <>&#10005;</> : <> &#8801;</>}
							</OpenLinksButton>
						</ul>
					</NavbarLinkContainer>
				</LeftContainer>
				<RightContainer>
        <Link to="/" onClick={closeNavbar}>
          <Logo src={LogoImg} />
        </Link>
				</RightContainer>
			</NavbarInnerContainer>
			{extendNavbar && (
				<NavbarExtendedContainer>
					<NavbarLinkExtended to="/" onClick={closeNavbar}> About</NavbarLinkExtended>
					<NavbarLinkExtended to="/work" onClick={closeNavbar}> Our Work</NavbarLinkExtended>
					<NavbarLinkExtended to="/contact" onClick={closeNavbar}>Contact</NavbarLinkExtended>
					<NavbarLinkExtended to="/library" onClick={closeNavbar}> My library</NavbarLinkExtended>
				</NavbarExtendedContainer>
			)}
		</NavbarContainer>
	);
}
  
 



  const StyledLine = styled(motion.div)`
  height: 0.3rem;
  background: #800080;
  width: 0%;
  position: absolute;
  bottom: -60%;
  left: 0%; 
`;



export const NavbarContainer = styled.nav.attrs((props) => ({
  extendNavbar: undefined, // Explicitly filter out 'extendNavbar' prop
}))`
  width: 100%;
  height: ${(props) => (props.extendNavbar ? "100vh" : "80px")};
  background-color: black;
  display: flex;
  flex-direction: column;

  @media (min-width: 700px) {
    height: 80px;
  }
`;


export const LeftContainer = styled.div`
  flex: 70%;
  display: flex;
  align-items: center;
  background-color: black;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;

  a {
    color: #fff;
    text-decoration: none;
  }

  ul {
    display: flex;
    list-style: none;
    margin-right: 1rem; 

    li {
      position: relative;
      padding-right: 2rem;

      @media (max-width: 700px) {        
        display: none;
      }
    }
  }
`;

export const RightContainer = styled.div`
  flex: 30%;
  top: 0;
  display: flex;
  justify-content: flex-end;
  position: sticky;
  padding-right: 10%;
  background-color: black;

  top: 0;
  z-index: 100;



  
`;

export const NavbarInnerContainer = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
`;

export const NavbarLinkContainer = styled.div`
  display: flex;
`;

export const NavbarLink = styled(Link)`
  color: white;
  font-size: x-large;
  font-family: Arial, Helvetica, sans-serif;
  text-decoration: none;
  margin: 10px;

  @media (max-width: 700px) {
    display: none;
  }
`;

export const NavbarLinkExtended = styled(Link)`
  color: white;
  font-size: x-large;
  font-family: Arial, Helvetica, sans-serif;
  text-decoration: none;
  margin: 10px;
  padding-top: 10px;
`;

export const Logo = styled.img`
  margin: 10px;
  max-width: 180px;
  height: auto;
`;

export const OpenLinksButton = styled.button`
  width: 70px;
  height: 70px;
  background: none;
  border: none;
  color: white;
  font-size: 45px;
  cursor: pointer;

  @media (min-width: 700px) {
    display: none;
  }
`;

export const NavbarExtendedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 700px) {
    display: none;
  }
`;


export default Navbar;