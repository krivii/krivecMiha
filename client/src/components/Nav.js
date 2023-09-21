import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Nav = () => {
  const { pathname } = useLocation();

  return (
    <StyledNav>
      <h1>
        <Link className='logo' to='/'>
          LOGOTIP MIHA
        </Link>
      </h1>
      <ul>
        <li>
          <Link to='/'>About</Link>
          <StyledLine
            transition={{ duration: 0.75 }}
            initial={{ width: '0%' }}
            animate={{ width: pathname === '/' ? '70%' : '0%' }}
          />
        </li>
        <li>
          <Link to='/work'>Our Work</Link>
          <StyledLine
            transition={{ duration: 0.75 }}
            initial={{ width: '0%' }}
            animate={{ width: pathname === '/work' ? '70%' : '0%' }}
          />
        </li>
        <li>
          <Link to='/contact'>Contact</Link>
          <StyledLine
            transition={{ duration: 0.75 }}
            initial={{ width: '0%' }}
            animate={{ width: pathname === '/contact' ? '70%' : '0%' }}
          />
        </li>
        <li>
          <Link to='/library'>My library</Link>
          <StyledLine
            transition={{ duration: 0.75 }}
            initial={{ width: '0%' }}
            animate={{ width: pathname === '/library' ? '70%' : '0%' }}
          />
        </li>
      </ul>
    </StyledNav>
  );
};

const StyledNav = styled.nav`
  min-height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0rem 2rem;  
  background: #282828;
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%; /* Stretch across the whole screen */

  a {
    color: #fff;
    text-decoration: none;
  }

  ul {
    display: flex;
    list-style: none;
    margin-right: 3rem; /* Add margin to the right */

    li {
      position: relative;
      padding-right: 2rem;

      @media (max-width: 600px) {        
        padding-right: 1rem;
      }

    }
  }

  .logo {
    font-size: 1.5rem;
    padding-left: 2rem;
    font-family: Roboto, sans-serif;
  }

  @media (max-width: 800px) {
    padding: 1rem 5rem;
  }

  @media (max-width: 600px) {
    padding: 1rem 2rem;
  }

  @media (max-width: 600px) {
    padding: 1rem;
  }
`;

const StyledLine = styled(motion.div)`
  height: 0.3rem;
  background: #23d997;
  width: 0%;
  position: absolute;
  bottom: -60%;
  left: 0%; /* Adjust left to 0% */
`;

export default Nav;
