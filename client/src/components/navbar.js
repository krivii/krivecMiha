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
			<NavLink to='/photos' activeStyle>
				Photos
			</NavLink>
			<NavLink to='/videos' activeStyle>
				Videos
			</NavLink>
			<NavLink to='/contact' activeStyle>
				Contact
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
