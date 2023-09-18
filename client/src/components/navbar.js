import React from 'react';
import {
Nav,
NavLink,
Bars,
NavMenu,
NavBtn,
NavBtnLink,
} from './elements';

export const Navbar = () => {
return (
	<>
	<Nav>
		<Bars />
		<NavMenu>
			<NavLink to='/about' activeStyle>
				About
			</NavLink>
			<NavLink to='/ourWork' activeStyle>
				Our work
			</NavLink>
			<NavLink to='/contact' activeStyle>
				Contact
			</NavLink>
			<NavLink to='/register' activeStyle>
				Register
			</NavLink>
			{/* Second Nav */}
			{/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
		</NavMenu>
		<NavBtn>
			<NavBtnLink to='/login'>Sign In</NavBtnLink>
		</NavBtn>
	</Nav>
	</>
);
};

export default Navbar;
